import App from './App';
import bridge from '@vkontakte/vk-bridge';
import ReactDOM from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';
import './types/interfaces';
import { Page, Router, RouterContext } from "@happysanta/router";
import { pages, routes } from "./types/enums";

export const VIEW_MAIN = 'view_main'

const routesConfig = {
  [pages.HOME]: new Page(routes.HOME, VIEW_MAIN),
  [pages.LOADING]: new Page(routes.LOADING, VIEW_MAIN),
  [pages.RATING]: new Page(routes.RATING, VIEW_MAIN),
  [pages.PROFILE]: new Page(routes.PROFILE, VIEW_MAIN),
  [pages.ADMIN]: new Page(routes.ADMIN, VIEW_MAIN),
}

const router = new Router(routesConfig)

router.start()

bridge.send('VKWebAppInit');
ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(<RouterContext.Provider value={router}><App /></RouterContext.Provider>);