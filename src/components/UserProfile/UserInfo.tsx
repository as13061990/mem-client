import { Icon56CommentsOutline, Icon56DownloadOutline, Icon56LikeOutline, Icon56ShareOutline } from "@vkontakte/icons";
import { Div, Text, usePlatform } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import '../../css/profile.css'
import State from "../../store/State";

export const UserInfo = observer(({ color }: { color: string }) => {
  const platform = usePlatform()

  return (
    <Div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
      <div className='profile-info-item profile-info-item-basis' >
        <Text weight='2' style={{ fontSize: platform !== 'vkcom' ? '13px' : '16px' }}>Лайки</Text>
        <Icon56LikeOutline fill={color} style={{ transform: 'scale(0.8)' }} />
        <Text weight='3'>{State.getUserProfile().likes}</Text>
      </div>
      <div className='profile-info-item profile-info-item-basis' >
        <Text weight='2' style={{ fontSize: platform !== 'vkcom' ? '13px' : '16px' }}>Репосты</Text>
        <Icon56ShareOutline fill={color} style={{ transform: 'scale(0.8)' }} />
        <Text weight='3'>{State.getUserProfile().share}</Text>
      </div>
      <div className='profile-info-item profile-info-item-basis' >
        <Text weight='2' style={{ fontSize: platform !== 'vkcom' ? '13px' : '16px' }}>Комменты</Text>
        <Icon56CommentsOutline fill={color} style={{ transform: 'scale(0.8)' }} />
        <Text weight='3'>{State.getUserProfile().comments}</Text>
      </div>
      <div className='profile-info-item profile-info-item-basis'>
        <Text weight='2' style={{ fontSize: platform !== 'vkcom' ? '13px' : '16px' }}>Мемы</Text>
        <Icon56DownloadOutline fill={color} style={{ transform: 'scale(0.8)' }} />
        <Text weight='3'>{State.getUserProfile().memes}</Text>
      </div>
    </Div>
  )
});

export default UserInfo
