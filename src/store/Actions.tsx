import bridge from '@vkontakte/vk-bridge';
import State from './State';
import User from './User';
import { ScreenSpinner } from '@vkontakte/vkui';
import { routes } from '../types/enums';
import axios from 'axios';

class Actions {
  
  public async checkUser(): Promise<void> {
    const user = await bridge.send('VKWebAppGetUserInfo');
		User.setUser(user);
    const res = await this.sendRequest('checkUser', {});

    if (res.error) {
      State.setSpinner(<ScreenSpinner state='error' aria-label='Ошибка' />);
    } else {
      const route = res.data.member ? routes.HOME : routes.INTRO;
      State.setRoute(route);
      State.setSpinner(null);
    }
  }

  public async sendRequest(route: string, data: object): Promise<IrequestRespons> {
    const body = {
      ...data,
      id: User.getUser().id,
      search: window.location.search
    }
    return await axios.post(process.env.REACT_APP_API + '/' + route, body).then(res => res.data);
  }
}

export default new Actions();