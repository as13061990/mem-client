import { Alert, FormItem, FormLayout, IconButton, Input } from "@vkontakte/vkui"
import { useEffect, useState } from "react";
import '../../css/comments.css';
import Actions from "../../store/Actions";
import State from "../../store/State";
import User from "../../store/User";
import { popouts } from "../../types/enums";
import { observer } from "mobx-react-lite";

const reg = /<script(.*?)>(.*?)<\/script>/mg

export const CommentForm = observer(() => {

  const [comment, setComment] = useState('');
  const [valid, setValid] = useState(true)

  const opened = State.getMemeOpen()

  useEffect(() => {
    setComment('')
    setValid(true)
    console.log('dsa')
  }, [opened])

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isValid = reg.test(value)
    if (isValid) {
      setComment('')
    } else {
      if (value.length > 299) {
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
        </Alert>, popouts.ALERT
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
})