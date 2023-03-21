import { Avatar, Button, Div, Link, Separator, Spacing, Subhead, Text } from "@vkontakte/vkui"
import { useState } from "react";

export const Comment = ({ avatar, name, message, time }: Icomment) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const textLength = message.length

  const toggleText = () => {
    setIsExpanded(prev => !prev);
  };

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
            {textLength > 120 ?
              isExpanded ? message : `${message.slice(0, 120)}...`
              : message}
            {textLength > 120 && !isExpanded ?
              <Link style={{marginLeft: '5px'}} onClick={toggleText}>
                Читать
              </Link> : null
            }
          </Text>

        </div>
      </div>
    </Div>
    <Spacing size={10} />
    <Separator />
  </>
  )
}