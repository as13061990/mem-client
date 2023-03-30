import { Button } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import '../../css/memes.css'
import Actions from "../../store/Actions";
import State from "../../store/State";
import { routes } from "../../types/enums";
import bridge from '@vkontakte/vk-bridge';
import { useMemo } from 'react';

interface IstatusBlockProps {
  data: Imeme
}

const moderation = async (meme: number, decision: boolean): Promise<void> => {
  const moderation = await Actions.sendRequest('moderation', {
    decision: decision,
    meme: meme
  }).then(res => res);

  if (decision) {
    const wall = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'wall.post', params: {
        owner_id: -Number(process.env.REACT_APP_GROUP),
        v: '5.131',
        from_group: 1,
        attachments: moderation.data.attachments,
        close_comments: 0,
        access_token: moderation.data.access_token,
      }
    }).then(res => res);

    await Actions.sendRequest('updateAttachments', { post_id: wall.response.post_id, meme: meme });
  }
  State.markModeration();
}

export const StatusBlock = observer(({data}: IstatusBlockProps): JSX.Element => {


  const component = useMemo(() => {
    if (data.status === 0 && State.getActivePanel() === routes.ADMIN) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button size='l' onClick={() => moderation(data.id, true)} stretched>Принять</Button>
          <Button size='l' onClick={() => moderation(data.id, false)} stretched mode='secondary'>Отклонить</Button>
        </div>
      )
    }

    if (data.status === 2) {
      return (<div className='rejection'>Отклонён</div>)
    }

    if (data.status === 0 && State.getActivePanel() !== routes.ADMIN) {
      return (<div className='rejection in-moderation'>На модерации</div>)
    }

    return null
  }, [data.id, data.status])

  return component
});
