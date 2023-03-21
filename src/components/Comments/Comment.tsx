import { Avatar, Div, Subhead, Text } from "@vkontakte/vkui"
import User from "../../store/User"

export const Comment = () => {
  const [yyyy, mm, dd, hh, mi] = new Date().toISOString().split(/[/:\-T]/)
  return (<>

        <Div>
          <div className="comments-block-comment">
            <Avatar src={User.getUser().photo_100} />
            <div className="comments-block-comment-info" >
              <Text weight='2'>
                {`${User.getNickname()}`}
              </Text>
              <Subhead weight='3'>{`${dd}/${mm}/${yyyy} ${hh}:${mi}`}</Subhead>
              <Text weight='3' className="comments-block-comment-info-text">
                asdasd asd asd asd asd asd asdas das das dasd as asdasd asd asd asd asd asd asdas das das dasd as asdasd asd asd asd asd asd asdas das das dasd as asdasd asd asd asd asd asd asdas das das dasd as
              </Text>
            </div>
          </div>
        </Div>
  </>
  )
}