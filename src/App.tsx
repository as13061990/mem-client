import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol
} from '@vkontakte/vkui';
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
  
  useEffect(() => {
    Actions.getData();
    window.addEventListener('popstate', () => State.goBack());
  }, [])

  return (
    <ConfigProvider isWebView={true}>
      <AdaptivityProvider>
        <AppRoot>
          <Observer render={() => (
            <>
              <SplitLayout>
                <SplitCol>
                  <View
                    activePanel={State.getActivePanel()} // Активная панель равная стейту.
                    history={State.getHistory()} // Ставим историю из массива панелей.
                    onSwipeBack={State.goBack} // При свайпе выполняется данная функция.
                  >
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