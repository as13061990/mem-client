import { Button, FormItem, Input, PanelHeader, Textarea } from "@vkontakte/vkui"
import { useState } from "react";

export const Comments = ({ active, activeCommentsToggle }) => {
  const [comment, setComment] = useState('');

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {value } = e.currentTarget;
    setComment(value)
  };

  const onClickContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return (<>
    <div
      className={"comments-overlay"}
      style={{ backgroundColor: active ? 'rgb(0,0,0,0.5)' : 'rgb(0,0,0,0)' }}
      onClick={activeCommentsToggle}>
      <div
        className="comments-block"
        style={{ transform: active ? 'translateY(0)' : 'translateY(60vh)' }}
        onClick={(e) => { onClickContent(e) }}
      >
        <PanelHeader>Комментарии</PanelHeader>
        <FormItem>
          <Textarea
            placeholder="Написать комментарий"
            onChange={onChange}
            value={comment}
          />
          <Button>Отправить</Button>
        </FormItem>
      </div >
    </div >
  </>
  )
}