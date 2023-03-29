import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
  Avatar,
  Group,
  Header,
  Cell,
  Div,
  Text
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import User from '../store/User';
import {
  Icon56LikeOutline,
  Icon56ShareOutline,
  Icon56CommentsOutline,
  Icon56DownloadOutline,
  Icon28CupOutline
} from '@vkontakte/icons';
import '../css/profile.css';

const color = 'rgb(52,163,255)'

export const UserProfile = observer(({ id }: IpanelProps) => {
  console.log(JSON.parse(JSON.stringify(User.getUser())))
  return (
    <Panel id={id}>
      <FixedLayout vertical='top'>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => window.history.back()} />}
        >Профиль Тимур Ермолаев</PanelHeader>
      </FixedLayout>
      {State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
      <div style={{ width: '100%', height: '40px' }}></div>
      <Div>
        <Div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
          <div className='profile-info-item'>
            <Text>Топ недели</Text>
            <Icon28CupOutline fill={color} />
            <Text>2</Text>
          </div>
          <Avatar src={User.getUser().photo_200} style={{margin: '0 50px'}} />
          <div className='profile-info-item'>
            <Text>Топ участников</Text>
            <Icon28CupOutline fill={color} />
            <Text>5</Text>
          </div>
        </Div>
        <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='profile-info-item'>
            <Text weight='2'>Лайки</Text>
            <Icon56LikeOutline fill={color} />
            <Text weight='3'>20</Text>
          </div>
          <div className='profile-info-item'>
            <Text weight='2'>Репосты</Text>
            <Icon56ShareOutline fill={color} />
            <Text weight='3'>2</Text>
          </div>
          <div className='profile-info-item'>
            <Text weight='2'>Комменты</Text>
            <Icon56CommentsOutline fill={color} />
            <Text weight='3'>22</Text>
          </div>
          <div className='profile-info-item'>
            <Text weight='2'>Мемы</Text>
            <Icon56DownloadOutline fill={color} />
            <Text weight='3'>2</Text>
          </div>
        </Div>
      </Div>
      <Tabbar />
    </Panel>
  );
})