import bridge from '@vkontakte/vk-bridge';
import State from './State';
import User from './User';
import { ScreenSpinner } from '@vkontakte/vkui';
import { routes } from '../types/enums';
import axios from 'axios';

class Actions {
  
  public async getData(): Promise<void> {
    const user = await bridge.send('VKWebAppGetUserInfo');
		User.setUser(user);
    const res = await this.sendRequest('getData', {});

    if (res.error) {
      State.setPopout(<ScreenSpinner state='error' aria-label='Ошибка' />);
    } else {
      User.setNickname(res.data.user.name);
      User.setUseNickname(res.data.user.nickname);
      State.setRoute(res.data.user.member ? routes.HOME : routes.INTRO);
      State.setAdmin(res.data.admin);
      State.setPopout(null);
    }
  }

  public setName(name: string, checked: boolean): void {
    if (name !== User.getNickname() || checked !== User.getUseNickname()) {
      User.setNickname(name);
      User.setUseNickname(checked);
      this.sendRequest('setName', {
        name: name,
        nickname: checked
      });
    }
  }

  private async sendRequest(route: string, data: object): Promise<IrequestRespons> {
    const body = {
      ...data,
      id: User.getUser().id,
      search: window.location.search
    }
    return await axios.post(process.env.REACT_APP_API + '/' + route, body).then(res => res.data);
  }
}

export default new Actions();