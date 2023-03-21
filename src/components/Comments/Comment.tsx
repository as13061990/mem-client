import { Avatar, Div, Separator, Spacing, Subhead, Text } from "@vkontakte/vkui"


export const Comment = ({ avatar, name, message, time }: Icomment) => {

  return (<>
    
    <Div>
      <div className="comments-block-comment">
        <Avatar src={avatar} />
        <div className="comments-block-comment-info" >
          <Text weight='2'>
            {name}
          </Text>
          <Subhead className="comments-block-comment-info-time" weight='3'>{time}</Subhead>
          <Text weight='3' className="comments-block-comment-info-text">
            {message}
          </Text>
        </div>
      </div>
    </Div>
    <Spacing size={10} />
    <Separator />
  </>
  )
}