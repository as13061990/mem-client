import { FormItem, IconButton, Input } from "@vkontakte/vkui"
import { useState } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";

export const CommentForm = () => {
  const [comment, setComment] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setComment(value)
  };

  const onClick = () => {
    Actions.sendComment({message: comment, meme: State.getMemeOpen()})
    setComment('')
  }

  return (<>

    <FormItem>
      <div className="comments-block-form">
        <Input
          className="comments-block-textarea"
          placeholder="Написать комментарий"
          onChange={onChange}
          value={comment}
        />
        <IconButton onClick={onClick}>
          <div className="comments-block-form-btn "/>
        </IconButton>
      </div>
    </FormItem>

  </>
  )
}