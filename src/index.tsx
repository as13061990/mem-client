import App from './App';
import bridge from '@vkontakte/vk-bridge';
import ReactDOM from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';
import './types/interfaces';

bridge.send('VKWebAppInit');
ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(<App />);