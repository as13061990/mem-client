import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from '@vkontakte/vkui';
import Tabbar from '../components/UI/Tabbar';
import { observer } from 'mobx-react-lite';
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
      <UserProfileWrapper/>
      <Tabbar />
    </Panel>
  );
})