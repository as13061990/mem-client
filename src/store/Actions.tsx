import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';
import State from './State';
import User from './User';
import { ScreenSpinner } from '@vkontakte/vkui';
import { routes } from '../types/enums';
import axios from 'axios';

class Actions {

  public async getData(): Promise<void> {
    const user = await bridge.send('VKWebAppGetUserInfo');
    User.setUser(user);
    const reward = await bridge.send('VKWebAppCheckNativeAds', { ad_format: EAdsFormats.REWARD }).then(data => data.result);
    const res = await this.sendRequest('getData', {});

    if (res.error) {
      State.setPopout(<ScreenSpinner state='error' aria-label='Ошибка' />);
    } else {
      User.setNickname(res.data.user.name);
      User.setUseNickname(res.data.user.nickname);
      User.setNotify(res.data.user.notify);
      User.setSubscribe(res.data.user.subscribe);
      User.setMemes(res.data.user.memes);
      const rewarded = reward && res.data.rewarded;
      State.setReward(rewarded);
      State.setTimer(res.data.time);
      State.setRoute(res.data.user.member ? routes.HOME : routes.INTRO);
      State.setAdmin(res.data.admin);
      State.setPopout(null);
      this.subscribes();
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

  private subscribes(): void {
    bridge.subscribe(e => {
      switch (e.detail.type) {
        case 'VKWebAppDenyNotificationsResult':
          User.setNotify(false);
          break;
        case 'VKWebAppAllowNotificationsResult':
          User.setNotify(true);
          break;
      }
    });
  }

  public async sendRequest(route: string, data: object): Promise<IrequestRespons> {
    const body = {
      ...data,
      id: User.getUser().id,
      search: window.location.search
    }
    return await axios.post(process.env.REACT_APP_API + '/' + route, body).then(res => res.data);
  }

  public async getDataRatingUsers(): Promise<void> {
    const response = await this.sendRequest('getRatings', {})
    State.setRatingUsers(response.data)
  }

  public async getDataComments(memeId: number): Promise<void> {
    const response = await this.sendRequest('getCommemts', { meme: memeId })
    State.setComments(response.data)
  }

  public async sendComment(comment: IcommentSend): Promise<void> {
    await this.sendRequest('sendComment', comment)
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    const date = new Date()
    const time = [date.getFullYear(), padTo2Digits(date.getMonth() + 1),padTo2Digits(date.getDate()),].join('.') 
    + ' ' + [ padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')

    State.addOneComment({
      name: User.getUser().first_name,
      message: comment.message,
      avatar: User.getUser().photo_100,
      time: time
    })
  }
}

export default new Actions();