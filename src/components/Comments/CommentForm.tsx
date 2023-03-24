import { FormItem, IconButton, Input } from "@vkontakte/vkui"
import { useState } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";

const reg = /<script(.*?)>(.*?)<\/script>/mg

export const CommentForm = () => {
  const [comment, setComment] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isValid = reg.test(value)
    if ( isValid ) { 
      setComment('') 
    } else {
      setComment(value)
    }
  };

  const onClick = () => {
    if (comment) {
      Actions.sendComment({ message: comment, meme: State.getMemeOpen() })
      setComment('')
    }
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
        <IconButton disabled={!comment} onClick={onClick}>
          <div className="comments-block-form-btn " />
        </IconButton>
      </div>
    </FormItem>

  </>
  )
}