import { ActionSheet, ActionSheetItem, Alert, usePlatform } from "@vkontakte/vkui";
import Actions from "../../store/Actions";
import State from "../../store/State";
import User from "../../store/User";
import { modals, popouts } from "../../types/enums";
import { useCallback, useEffect } from 'react';

interface ImoreProps {
  refMore: React.MutableRefObject<HTMLDivElement>
  data: Imeme | Icomment
}

const deleteAlert = (data: Imeme): JSX.Element => {
  return (<Alert
    actions={[
      {
        title: 'Отмена',
        autoclose: true,
        mode: 'cancel',
      },
      {
        title: 'Удалить',
        autoclose: true,
        mode: 'destructive',
        action: () => Actions.deleteMeme(data),
      },
    ]}
    actionsLayout="horizontal"
    onClose={() => { State.setPopout(null) }}
    header="Удаление записи"
    text="Вы уверены, что хотите удалить эту запись?"
  />

  )
}



export const More = ({ refMore, data }: ImoreProps): JSX.Element => {

  const platform = usePlatform()

  const onDelete = useCallback(() => {
    if ('message' in data) {
      Actions.deleteComment(data)
    } else if ('vk_url' in data) {
      State.setPopout(deleteAlert(data), popouts.ALERT)
    }
  }, [data])

  const onReport = useCallback(() => {
    if ('message' in data) {
      State.setReportComment(data);
    } else if ('vk_url' in data) {
      State.setReportMeme(data)
    }
    State.setActiveModal(modals.REPORT)
  }, [data])

  const onClose = useCallback(() => {
    State.setPopout(null)
  }, [])

  useEffect(() => {
    if (platform === 'vkcom') {
      window.addEventListener('scroll', onClose)
    }

    return () => {
      if (platform === 'vkcom') {
        window.removeEventListener('scroll', onClose)
      }
    }
  }, [onClose, platform])

  return (
    <ActionSheet toggleRef={refMore} onClose={onClose}>
      {data.user_id === User.getUser().id || State.isAdmin() ?
        <ActionSheetItem autoclose mode="destructive" onClick={onDelete}>
          Удалить запись
        </ActionSheetItem>
        : null}
      {data.user_id !== User.getUser().id ?
        <ActionSheetItem autoclose onClick={onReport}>
          Пожаловаться
        </ActionSheetItem>
        : null}
    </ActionSheet>
  );
}