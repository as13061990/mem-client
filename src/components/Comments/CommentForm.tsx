import { FormItem, IconButton, Input } from "@vkontakte/vkui"
import { useState } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";

const reg = /<script(.*?)>(.*?)<\/script>/mg

export const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [valid, setValid] = useState(true)
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isValid = reg.test(value)
    setValid(true)
    if (isValid) { 
      setComment('') 
    } else {
      if (value.length > 300) {
        setValid(false)
      } else {
        setComment(value)
      }
    }
  };

  const onClick = () => {
    if (comment.trim()) {
      Actions.sendComment({ message: comment.trim(), meme: State.getMemeOpen() })
      setComment('')
      setValid(true)
    } else {
      setValid(false)
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
          status={valid ? 'default' : 'error'}
        />
        <IconButton disabled={!comment} onClick={onClick}>
          <div className="comments-block-form-btn " />
        </IconButton>
      </div>
    </FormItem>

  </>
  )
}