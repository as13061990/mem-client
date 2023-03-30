import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import '../css/profile.css';
import UserProfileWrapper from '../components/UserProfile/UserProfileWrapper';


export const UserProfile = observer(({ id }: IpanelProps) => {

  return (
    <Panel id={id}>
      <FixedLayout vertical='top'>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => window.history.back()} />}
          style={{paddingRight: '24px'}}
        >
          Наш герой
        </PanelHeader>
      </FixedLayout>
      {State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
      <div style={{ width: '100%', height: '40px' }}></div>
      <UserProfileWrapper/>
      <Tabbar />
    </Panel>
  );
})