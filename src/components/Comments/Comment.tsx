import { Icon28MoreHorizontal } from "@vkontakte/icons";
import { ActionSheet, ActionSheetItem, Avatar, Div, Link, Separator, Spacing, Subhead, Text } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import Actions from "../../store/Actions";
import State from "../../store/State";
import User from "../../store/User";
import { modals } from "../../types/enums";


const more = (ref: React.MutableRefObject<HTMLDivElement>, comment: Icomment): JSX.Element => {
  return (
    <ActionSheet toggleRef={ref} onClose={() => State.setPopout(null)}>
      {comment.name === User.getNickname() ?
        <ActionSheetItem autoclose mode="destructive" onClick={() => { Actions.deleteComment(comment) }}>
          Удалить комментарий
        </ActionSheetItem>
        :
        <ActionSheetItem autoclose onClick={() => { State.setActiveModal(modals.REPORT); State.setReportComment(comment) }}>
          Пожаловаться
        </ActionSheetItem>
      }
    </ActionSheet>
  );
}




export const Comment = observer(({ data }: { data: Icomment }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const textLength = data.message.length

  const toggleText = () => {
    setIsExpanded(prev => !prev);
  };

  const refMore: React.MutableRefObject<HTMLDivElement> = useRef();

  return (<>

    <Div>
      <div className="comments-block-comment">
        <Avatar src={data.avatar} />
        <div className="comments-block-comment-info-wrapper" >
          
          <div className="comments-block-comment-info">
            <Text weight='2' style={{ flexBasis: '75%' }}>
              {data.name}
            </Text>
            <Subhead
              className="comments-block-comment-info-time"
              weight='3'
              style={{ flexBasis: '25%'}}
            >
              {data.time}
            </Subhead>
            <Icon28MoreHorizontal
              style={{ flexBasis: '1%', cursor: 'pointer', marginTop: '-5px' }}
              getRootRef={refMore}
              onClick={() => State.setPopout(more(refMore, data))}
            />
          </div>

          <Text weight='3' className="comments-block-comment-info-text">
            {textLength > 120 ?
              isExpanded ? data.message : `${data.message.slice(0, 120)}...`
              : data.message}
            {textLength > 120 && !isExpanded ?
              <Link onClick={toggleText}>
                Читать
              </Link> : null
            }
          </Text>

        </div>
      </div>
    </Div>
    <Spacing size={10} />
    <Separator />
  </>
  )
});