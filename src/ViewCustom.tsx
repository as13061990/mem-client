import {
  View,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import Admin from "./panels/Admin";
import { Home } from "./panels/Home";
import { IntroFirst } from "./panels/IntroFirst";
import Loading from "./panels/Loading";
import { MyProfile } from "./panels/MyProfile";
import { Rating } from "./panels/Rating";
import State from "./store/State";
import { routes } from "./types/enums";
import { useCallback, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge';
import { Rules } from './panels/Rules';
import { IntroSecond } from './panels/IntroSecond';
import { UserProfile } from './panels/UserProfile';
import { UserMemes } from './panels/UserMemes';

export const ViewCustom = observer(() => {
  const isFirst = State.getHistory().length === 1;
  useEffect(() => {
    bridge.send('VKWebAppSetSwipeSettings', { history: isFirst });
  }, [isFirst])
  const handleSwipeBackStart = useCallback(() => {
    State.setSwipe(true)
  }, []);

  const handleSwipeBack = useCallback(() => {
    if (!State.getSwipe()) return
    State.goBack();
    State.setSwipe(false)
  }, []);
  return (
    <View
      activePanel={State.getActivePanel()} // Активная панель равная стейту.
      history={State.getHistory()} // Ставим историю из массива панелей.
      onSwipeBackStart={handleSwipeBackStart}
      onSwipeBack={handleSwipeBack} // При свайпе выполняется данная функция.
    >

      <Loading id={routes.LOADING} />
      <IntroFirst id={routes.INTROFIRST} />
      <IntroSecond id={routes.INTROSECOND} />
      <Home id={routes.HOME} />
      <Rating id={routes.RATING} />
      <MyProfile id={routes.MYPROFILE} />
      <UserProfile id={routes.USERPROFILE} />
      <Admin id={routes.ADMIN} />
      <Rules id={routes.RULES} />
      <UserMemes id={routes.USERMEMES}/>
    </View>
  )
});

export default View
