import { Div } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../../store/State";
import { Comment } from "../Comments/Comment";
import { useEffect } from 'react'
import Actions from "../../store/Actions";

export const ReportComments = observer(() => {
  useEffect(() => {
    Actions.getCommentsStrikes()
  }, [])
  return (
    <Div>
      {State.getCommentsStrikes()?.map((comment: Icomment, i: number) => {
        return (
          <Comment
            key={i}
            data={comment}
          />
        )
      })}
    </Div>
  )
});
