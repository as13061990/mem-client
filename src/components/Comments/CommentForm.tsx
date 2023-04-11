import { Alert, FormItem, FormLayout, IconButton, Input } from "@vkontakte/vkui"
import { useState } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";
import User from "../../store/User";

const reg = /<script(.*?)>(.*?)<\/script>/mg

export const CommentForm = () => {

  const [comment, setComment] = useState('');
  const [valid, setValid] = useState(true)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isValid = reg.test(value)
    if (isValid) {
      setComment('')
    } else {
      if (value.length > 300) {
        setValid(false)
      } else {
        setComment(value)
        setValid(true)
      }
    }
  };

  const onClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      Actions.sendComment({ message: comment.trim(), meme: State.getMemeOpen() })
      setComment('')
      setValid(true)
    } else {
      setValid(false)
      State.setPopout(
        <Alert
          actions={[{
            title: 'Понятно',
            autoclose: true,
            mode: 'cancel'
          }]}
          onClose={() => State.setPopout(null)}
        >
          <p>Нельзя отправить пустое сообщение!</p>
        </Alert>
      );
    }
  }

  return (<>
    <FormLayout onSubmit={(e) => { onClick(e) }}>
      <FormItem>
        <div className="comments-block-form">
          <Input
            className="comments-block-textarea"
            placeholder={User.getBan() ? "Вы забанены" : "Написать комментарий"}
            onChange={onChange}
            value={comment}
            disabled={User.getBan()}
            status={valid ? 'default' : 'error'}
          />
          <IconButton disabled={!comment} type="submit">
            <div className="comments-block-form-btn " />
          </IconButton>
        </div>
      </FormItem>
    </FormLayout>
  </>
  )
}