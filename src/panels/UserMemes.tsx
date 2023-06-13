import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from '@vkontakte/vkui';
import Tabbar from '../components/UI/Tabbar';
import { observer } from 'mobx-react-lite';
import '../css/profile.css';
import State from '../store/State';
import Memes from '../components/Memes/Memes';


export const UserMemes = observer(({ id }: IpanelProps) => {

  return (
    <Panel id={id}>
      <FixedLayout vertical='top'>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => window.history.back()} />}
          style={{paddingRight: '24px'}}
        >
          Мемы пользователя "{State.getUserProfile().name}"
        </PanelHeader>
      </FixedLayout>
      {State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
			<div style={{ width: '100%', height: '50px' }}></div>
        <Memes/>
      <Tabbar />
    </Panel>
  );
})