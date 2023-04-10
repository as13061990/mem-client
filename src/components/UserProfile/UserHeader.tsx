import { Icon28CupOutline } from "@vkontakte/icons";
import { Avatar, Div, Link, Text, usePlatform } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../../store/State";
import '../../css/profile.css'

export const UserHeader = observer(({ color }: { color: string }) => {
  const platform = usePlatform()
  return (
    <Div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: platform !== 'vkcom' ? '20px' : '50px' }}>
      <div className='profile-info-item'>
        <Text>Топ недели</Text>
        <Icon28CupOutline fill={color} style={{ transform: 'scale(2)', margin: '15px 0' }} />
        <Text>{State.getUserProfile()?.top_week}</Text>
      </div>
      <div className='profile-info-item profile-info-item-avatar'>
        <Link
          href={`https://vk.com/id${State.getUserProfile()?.id}`}
          target='_blank'
          style={{ textDecoration: 'none', color: 'black', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <Text weight="1" style={{marginLeft: '12px', fontSize: platform !== 'vkcom' ? '18px' : '24px', wordBreak: 'break-word', lineHeight: '28px'}}>
            {State.getUserProfile()?.name}
          </Text>
          <Avatar src={State.getUserProfile()?.avatar} style={{ margin: '40px 0 20px 15px', transform: 'scale(1.3)' }} size={96} />
        </Link>
      </div>
      <div className='profile-info-item'>
        <Text>Топ участников</Text>
        <Icon28CupOutline fill={color} style={{ transform: 'scale(2)', margin: '15px 0' }} />
        <Text>{State.getUserProfile()?.top_all}</Text>
      </div>
    </Div>
  )
});

export default UserHeader
