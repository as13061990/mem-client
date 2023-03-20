import { Avatar, Button, Card, Cell, FormItem, Input, PanelHeader, RichCell, Spacing, Text, Textarea } from "@vkontakte/vkui"
import { useState } from "react";
import User from "../store/User";

export const Comments = ({ active, activeCommentsToggle }) => {
  const [comment, setComment] = useState('');

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setComment(value)
  };

  const onClickContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  const [yyyy, mm, dd, hh, mi] = new Date().toISOString().split(/[/:\-T]/)
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
          <div style={{ display: 'flex', gap: '30px' }}>
            <Textarea
              style={{ flexGrow: 1 }}
              placeholder="Написать комментарий"
              onChange={onChange}
              value={comment}
            />
            <Button size='l'>Отправить</Button>
          </div>
        </FormItem>

        <RichCell
          text='asdasd asd asda sda s asda sdas das dasd asd asd asda sd asd asdasd asdas dasd asd asd'
          before={<Avatar src={User.getUser().photo_100} />}
        >
          <Text weight='2'>
            {`${User.getNickname()} ${dd}/${mm}/${yyyy} ${hh}:${mi}`}
          </Text>
        </RichCell>
      </div >
    </div >
  </>
  )
}