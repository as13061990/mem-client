import { Icon56CommentsOutline, Icon56DownloadOutline, Icon56LikeOutline, Icon56ShareOutline } from "@vkontakte/icons";
import { Div, Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import '../../css/profile.css'
import State from "../../store/State";

export const UserInfo = observer(({ color }: { color: string }) => {

  return (
    <Div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div className='profile-info-item profile-info-item-basis' >
        <Text weight='2'>Лайки</Text>
        <Icon56LikeOutline fill={color} />
        <Text weight='3'>{State.getUserProfile().likes}</Text>
      </div>
      <div className='profile-info-item profile-info-item-basis' >
        <Text weight='2'>Репосты</Text>
        <Icon56ShareOutline fill={color} />
        <Text weight='3'>{State.getUserProfile().share}</Text>
      </div>
      <div className='profile-info-item profile-info-item-basis' >
        <Text weight='2'>Комменты</Text>
        <Icon56CommentsOutline fill={color} />
        <Text weight='3'>{State.getUserProfile().comments}</Text>
      </div>
      <div className='profile-info-item profile-info-item-basis'>
        <Text weight='2'>Мемы</Text>
        <Icon56DownloadOutline fill={color} />
        <Text weight='3'>{State.getUserProfile().memes}</Text>
      </div>
    </Div>
  )
});

export default UserInfo
