import {
	Tabbar,
  TabbarItem,
  FixedLayout,
  Separator
} from '@vkontakte/vkui';
import {
	Icon28Smiles2Outline,
	Icon28UserCircleOutline,
  Icon28CupOutline,
  Icon28CrownOutline
} from '@vkontakte/icons';
import State from '../store/State';
import { routes } from '../types/enums';

const Footer = () => (
  <FixedLayout vertical='bottom'>
    <Separator style={{ margin: '12px 0' }} />
    <Tabbar style={{ position: 'static', margin: '10px 0' }} shadow={false}>
      <TabbarItem
        style={{ cursor: 'pointer' }}
        selected={State.getTab() === routes.HOME}
        onClick={() => State.setRoute(routes.HOME)}
        text='Мемы'
      ><Icon28Smiles2Outline /></TabbarItem>
      <TabbarItem
        style={{ cursor: 'pointer' }}
        selected={State.getTab() === routes.RATING}
        onClick={() => State.setRoute(routes.RATING)}
        text='Рейтинг'
      ><Icon28CupOutline /></TabbarItem>
      <TabbarItem
        style={{ cursor: 'pointer' }}
        selected={ State.getTab() === routes.PROFILE}
        onClick={() => State.setRoute(routes.PROFILE)}
        text='Профиль'
      ><Icon28UserCircleOutline /></TabbarItem>
      {State.isAdmin() &&
      <TabbarItem
        style={{ cursor: 'pointer' }}
        selected={ State.getTab() === routes.ADMIN}
        onClick={() => State.setRoute(routes.ADMIN)}
        text='Админ'
      ><Icon28CrownOutline /></TabbarItem>
      }
    </Tabbar>
  </FixedLayout>
);

export default Footer;