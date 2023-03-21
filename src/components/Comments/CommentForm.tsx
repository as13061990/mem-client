import { FormItem, IconButton, Input } from "@vkontakte/vkui"
import { useState } from "react";
import '../../css/comments.css';

export const CommentForm = () => {
  const [comment, setComment] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setComment(value)
  };


  return (<>

    <FormItem>
      <div className="comments-block-form">
        <Input
          className="comments-block-textarea"
          placeholder="Написать комментарий"
          onChange={onChange}
          value={comment}
        />
        <IconButton>
          <div className="comments-block-form-btn "/>
        </IconButton>
      </div>
    </FormItem>

  </>
  )
}