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
import { useEffect, useState } from 'react'

const App = (): JSX.Element => {

  useEffect(() => {
    Actions.getData();
    window.addEventListener('popstate', () => goBack());
  }, [])

  const [activePanel, setActivePanel] = useState("home"); // Ставим начальную панель
  const [history, setHistory] = useState(['home']) // Заносим начальную панель в массив историй.

  const goBack = () => {
    if (history.length === 1) {  // Если в массиве одно значение:
      bridge.send("VKWebAppClose", { "status": "success" }); // Отправляем bridge на закрытие сервиса.
    } else if (history.length > 1) { // Если в массиве больше одного значения:
      history.pop() // удаляем последний элемент в массиве.
      setActivePanel(history[history.length - 1]) // Изменяем массив с иторией и меняем активную панель.
    }
  }

  const goToPage = (name) => { // В качестве аргумента принимаем id панели для перехода
    window.history.pushState({ panel: name }, name); // Создаём новую запись в истории браузера
    setActivePanel(name); // Меняем активную панель
    history.push(name); // Добавляем панель в историю
  };

  return (
    <ConfigProvider isWebView={true}>
      <AdaptivityProvider>
        <AppRoot>
          <Observer render={() => (
            <>
              <SplitLayout>
                <SplitCol>
                  <View
                    activePanel={activePanel} // Активная панель равная стейту.
                    history={history} // Ставим историю из массива панелей.
                    onSwipeBack={goBack} // При свайпе выполняется данная функция.
                  >
                    <Loading id={routes.LOADING} goToPage={goToPage}/>
                    <Intro id={routes.INTRO} goToPage={goToPage}/>
                    <Home id={routes.HOME} goToPage={goToPage}/>
                    <Rating id={routes.RATING} goToPage={goToPage}/>
                    <Profile id={routes.PROFILE} goToPage={goToPage}/>
                    <Admin id={routes.ADMIN} goToPage={goToPage}/>
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