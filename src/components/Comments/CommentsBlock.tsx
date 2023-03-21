import { FixedLayout, PanelHeader, Separator, Spacing } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

export const CommentsBlock = observer(() => {

  const onClickContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  const active = State.getMemeOpen() > 0


  useEffect(() => {
    if (active) {
      Actions.getDataComments(State.getMemeOpen())
      document.body.style.overflow = 'hidden'
    } else {
      State.setComments([])
      document.body.style.overflow = 'scroll'
    }

  }, [active])

  return (<>
    <div
      className={"comments-overlay"}
      style={{ backgroundColor: active ? 'rgb(0,0,0,0.5)' : 'rgb(0,0,0,0)', visibility: active ? 'visible' : 'hidden' }}
      onClick={() => { State.setMemeOpen(-1) }}>
      <div
        className="comments-block"
        style={{ transform: active ? 'translateY(0)' : 'translateY(60vh)' }}
        onClick={(e) => { onClickContent(e) }}
      >

        <FixedLayout>
          <PanelHeader>Комментарии</PanelHeader>
          <CommentForm />
          <Spacing size={4}/>
        </FixedLayout>

        <div style={{overflowY: 'auto', height: '60vh', paddingTop: '120px'}}>

        {State.getComments().map((comment: Icomment, i: number) => {
          return (
            <Comment
              key={i}
              avatar={comment.avatar}
              message={comment.message}
              name={comment.name}
              time={comment.time}
            />
          )
        })}
        </div>
      </div >
    </div >
  </>
  )
})