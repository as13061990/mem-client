import { Icon20AddCircle } from "@vkontakte/icons";
import { Button, FormItem, PanelHeader, Textarea } from "@vkontakte/vkui"
import { useState, useEffect } from "react";
import '../../css/comments.css';
import { Comment } from "./Comment";

export const CommentsBlock = ({ active, activeCommentsToggle }) => {
  const [comment, setComment] = useState('');

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setComment(value)
  };

  const onClickContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }

  }, [active])

  return (<>
    <div
      className={"comments-overlay"}
      style={{ backgroundColor: active ? 'rgb(0,0,0,0.5)' : 'rgb(0,0,0,0)', visibility: active ? 'visible' : 'hidden' }}
      onClick={activeCommentsToggle}>
      <div
        className="comments-block"
        style={{ transform: active ? 'translateY(0)' : 'translateY(60vh)' }}
        onClick={(e) => { onClickContent(e) }}
      >
        <PanelHeader>Комментарии</PanelHeader>

        <FormItem>
          <div className="comments-block-form">
            <Textarea
              className="comments-block-textarea"
              placeholder="Написать комментарий"
              onChange={onChange}
              value={comment}
            />
            <Button size='l'>Отправить</Button>
          </div>
        </FormItem>

        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />

        <Button
          size="l"
          appearance="accent"
          mode="tertiary"
          before={<Icon20AddCircle />}
          stretched
        >
          Показать ещё комментарии
        </Button>
      </div >
    </div >
  </>
  )
}