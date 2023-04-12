import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  usePlatform
} from '@vkontakte/vkui';
import State from './store/State';
import { Observer } from 'mobx-react-lite';
import Actions from './store/Actions';
import { useEffect } from 'react'
import { ViewCustom } from './ViewCustom';
import Modals from './components/Modals/ModalsRootCustom';
import bridge from '@vkontakte/vk-bridge';

const App = (): JSX.Element => {
  const platformText = usePlatform()

  useEffect(() => {
    bridge.send("VKWebAppGetLaunchParams").then(res=>State.setPlatform(res.vk_platform));
    bridge.send("VKWebAppSetViewSettings", {
      status_bar_style: "dark",
      action_bar_color: "#ffffff",
    });
    Actions.getData();
    window.addEventListener('popstate', () => {State.goBack();});
    return () => {
      window.removeEventListener('popstate', () => State.goBack());
    }
  }, [])

  return (
    <ConfigProvider isWebView={true} platform={platformText}>
      <AdaptivityProvider>
        <AppRoot>
          <Observer render={() => (
            <>
              <SplitLayout popout={State.getPopout()} modal={<Modals/>}>
                <SplitCol>
                  <ViewCustom/>
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