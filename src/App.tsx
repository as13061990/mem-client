import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol
} from '@vkontakte/vkui';
import State from './store/State';
import { Observer } from 'mobx-react-lite';
import Actions from './store/Actions';
import { useEffect } from 'react'
import { ViewCustom } from './ViewCustom';

const App = (): JSX.Element => {

  useEffect(() => {
    Actions.getData();
    window.addEventListener('popstate', () => {State.goBack();});
    return () => {
      window.removeEventListener('popstate', () => State.goBack());
    }
  }, [])

  return (
    <ConfigProvider isWebView={true}>
      <AdaptivityProvider>
        <AppRoot>
          <Observer render={() => (
            <>
              <SplitLayout popout={State.getPopout()}>
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