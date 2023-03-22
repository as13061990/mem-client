import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import Loading from './panels/Loading';
import Home from './panels/Home';
import { Rating } from './panels/Rating';
import State from './store/State';
import { routes } from './types/enums';
import { Observer } from 'mobx-react-lite';
import Actions from './store/Actions';
import Intro from './panels/Intro';
import { Profile } from './panels/Profile';
import Admin from './panels/Admin';
import { useEffect } from 'react'

const App = (): JSX.Element => {

  useEffect(()=>{
    Actions.getData();
  },[])

  const goBack = () => {
    const history = State.getHistory()
    if (history.length === 1) {
      bridge.send("VKWebAppClose", { "status": "success" });
    } else if (history.length > 1) {
      State.popOneHistory()
    }
  }
  

  return (
    <ConfigProvider isWebView>
      <AdaptivityProvider>
        <AppRoot>
          <Observer render={() => (
            <>
              <SplitLayout popout={State.getPopout()}>
                <SplitCol>
                  <View activePanel={State.getRoute()} history={State.getHistory()} onSwipeBack={goBack}>
                    <Loading id={routes.LOADING} />
                    <Intro id={routes.INTRO} />
                    <Home id={routes.HOME} />
                    <Rating id={routes.RATING} />
                    <Profile id={routes.PROFILE} />
                    <Admin id={routes.ADMIN} />
                  </View>
                </SplitCol>
              </SplitLayout>
            </>
          )} />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;