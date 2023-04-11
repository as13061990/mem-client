import { FixedLayout, PanelHeader, Spacing } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { Icon20AddCircle } from '@vkontakte/icons';


export const CommentsBlock = observer(() => {

  const onClickContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  const active = State.getMemeOpen() > 0
  const reportInfo = State.getReportInfo()
  const reportComment = State.getReportComment()
  const popout = State.getPopout()

  useEffect(() => {
    if (active) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [active, reportComment, reportInfo, popout])

  useEffect(() => {
    if (active) {
      Actions.getDataComments(State.getMemeOpen())
    } else {
      State.setComments([])
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
        <div style={{ position: 'relative' }}>
          <Icon20AddCircle fill="black"
            onClick={() => { State.setMemeOpen(-1) }}
            className='comments-block-close-btn'
            style={{ position: 'absolute', right: 30, top: 15, zIndex: 20, cursor: 'pointer', transform: 'rotate(45deg) scale(1.8)', opacity: active ? '0.8' : '0' }}
          />
        </div>

        <FixedLayout>
          <PanelHeader>Комментарии</PanelHeader>
          <CommentForm />
          <Spacing size={4} />
        </FixedLayout>
        <div style={{ width: '100%', marginTop: '120px' }} />

        <div style={{ overflowY: 'auto', height: '74%', marginBottom: '120px', marginTop: '120px' }} onScroll={()=>{State.setPopout(null)}}>

          {State.getComments()?.map((comment: Icomment, i: number) => {
            return (
              <Comment
                key={i}
                data={comment}
              />
            )
          })}

        </div>
      </div >
    </div >
  </>
  )
})