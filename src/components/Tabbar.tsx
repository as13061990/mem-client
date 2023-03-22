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
import { pages, routes } from '../types/enums';
import User from '../store/User';
import { observer } from 'mobx-react-lite';
import Session from '../store/Session';
import { useRouter } from "@happysanta/router";

export default observer((): JSX.Element => {
  const router = useRouter()
  
  return (<>
    <div style={{ height: '100px' }} />
    <FixedLayout vertical='bottom'>
      <Tabbar style={{ position: 'static', margin: '10px 0' }} shadow={false}>
        <TabbarItem
          style={{ cursor: 'pointer' }}
          selected={State.getTab() === routes.HOME}
          onClick={() => {State.setRoute(routes.HOME); router.pushPage(pages.HOME)}}
          text='Мемы'
        ><Icon28Smiles2Outline /></TabbarItem>
        <TabbarItem
          style={{ cursor: 'pointer' }}
          selected={State.getTab() === routes.RATING}
          onClick={() => {State.setRoute(routes.RATING); router.pushPage(pages.RATING)}}
          text='Рейтинг'
        ><Icon28CupOutline /></TabbarItem>
        <TabbarItem
          style={{ cursor: 'pointer' }}
          selected={State.getTab() === routes.PROFILE}
          indicator={Session.getMemesNotif() && User.getMemes() > 0 && <Counter size='s' mode='prominent'>{User.getMemes()}</Counter>}
          onClick={() => {State.setRoute(routes.PROFILE); router.pushPage(pages.PROFILE)}}
          text='Профиль'
        ><Icon28UserCircleOutline /></TabbarItem>
        {State.isAdmin() &&
          <TabbarItem
            style={{ cursor: 'pointer' }}
            selected={State.getTab() === routes.ADMIN}
            onClick={() => {State.setRoute(routes.ADMIN); router.pushPage(pages.ADMIN)}}
            text='Админ'
          ><Icon28CrownOutline /></TabbarItem>
        }
      </Tabbar>
    </FixedLayout>
  </>
  )
})