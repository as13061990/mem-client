import {
  Tabbar,
  TabbarItem,
  FixedLayout,
  Counter
} from '@vkontakte/vkui';
import {
  Icon28Smiles2Outline,
  Icon28UserCircleOutline,
  Icon28CupOutline,
  Icon28CrownOutline
} from '@vkontakte/icons';
import State from '../store/State';
import { memes, routes } from '../types/enums';
import User from '../store/User';
import { observer } from 'mobx-react-lite';
import Session from '../store/Session';
interface ItapBarProps {
  goToPage: (route:string) => void
}
export default observer(({goToPage}: ItapBarProps): JSX.Element => (
  <>
    <div style={{ height: '50px' }} />
    <FixedLayout vertical='bottom'>
      <Tabbar style={{ position: 'static', margin: '10px 0' }} shadow={false}>
        <TabbarItem
          style={{ cursor: 'pointer' }}
          selected={State.getTab() === routes.HOME}
          onClick={()=>goToPage(routes.HOME)}
          text='Мемы'
        ><Icon28Smiles2Outline /></TabbarItem>
        <TabbarItem
          style={{ cursor: 'pointer' }}
          selected={State.getTab() === routes.RATING}
          onClick={() => goToPage(routes.RATING)}
          text='Рейтинг'
        ><Icon28CupOutline /></TabbarItem>
        <TabbarItem
          style={{ cursor: 'pointer' }}
          selected={State.getTab() === routes.PROFILE}
          indicator={Session.getMemesNotif() && User.getMemes() > 0 && <Counter size='s' mode='prominent'>{User.getMemes()}</Counter>}
          onClick={() => goToPage(routes.PROFILE)}
          text='Профиль'
        ><Icon28UserCircleOutline /></TabbarItem>
        {State.isAdmin() &&
          <TabbarItem
            style={{ cursor: 'pointer' }}
            selected={State.getTab() === routes.ADMIN}
            onClick={() => goToPage(routes.ADMIN)}
            text='Админ'
          ><Icon28CrownOutline /></TabbarItem>
        }
      </Tabbar>
    </FixedLayout>
  </>
));