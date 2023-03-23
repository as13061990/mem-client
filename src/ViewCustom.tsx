import {
  View,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import Admin from "./panels/Admin";
import { Home } from "./panels/Home";
import Intro from "./panels/Intro";
import Loading from "./panels/Loading";
import { Profile } from "./panels/Profile";
import { Rating } from "./panels/Rating";
import State from "./store/State";
import { routes } from "./types/enums";
import { useCallback, useEffect, useState } from 'react'
import bridge from '@vkontakte/vk-bridge';

export const ViewCustom = observer(() => {
  const isFirst = State.getHistory().length === 1;
  const [swipe, setSwipe] = useState(false)

  useEffect(() => {
    bridge.send('VKWebAppSetSwipeSettings', { history: isFirst });
  }, [isFirst])

  const handleSwipeBackStart = useCallback(() => {
    setSwipe(true)
    console.log('SwipeBackStart')
  }, []);

  const handleSwipeBack = useCallback(() => {
    if (!swipe) return
    console.log('onSwipeBack');
    State.goBack();
    setSwipe(false)
  }, [swipe]);

  console.log(State.getHistory())

  return (
    <View
      activePanel={State.getActivePanel()} // Активная панель равная стейту.
      history={State.getHistory()} // Ставим историю из массива панелей.
      onSwipeBackStart={handleSwipeBackStart}
      onSwipeBack={handleSwipeBack} // При свайпе выполняется данная функция.
    >
      <Loading id={routes.LOADING} />
      <Intro id={routes.INTRO} />
      <Home id={routes.HOME} />
      <Rating id={routes.RATING} />
      <Profile id={routes.PROFILE} />
      <Admin id={routes.ADMIN} />
    </View>
  )
});

export default View
