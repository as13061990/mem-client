import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';
import State from './State';
import User from './User';
import { ScreenSpinner } from '@vkontakte/vkui';
import { reports, routes } from '../types/enums';
import axios from 'axios';

const OFFER_SUBSCRIBE_DELAY: number = 30000
const INTERSTITIAL_AD_DELAY: number = 60000

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
      State.setStories(res.data.stories)
      State.setReward(rewarded);
      State.setTimer(res.data.time);
      State.setActivePanel(res.data.user.member ? routes.HOME : routes.INTROFIRST);
      State.setHistory([State.getActivePanel()])
      State.setAdmin(res.data.admin);
      State.setPopout(null);
      this.subscribes();
      this.notifyToSubscribe(res.data.subscribeOffer, res.data.user.subscribe)
      this.showInterstitialAd(res.data.interstitial)
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
    const responseComments = await this.sendRequest('getCommemts', { meme: State.getMemeOpen() })
    State.setComments(responseComments.data)
  }

  public async notifyToSubscribe(subscribeOffer: boolean, userSubscribe: boolean): Promise<void> {
    if (subscribeOffer && !userSubscribe) {
      setTimeout(() => {
        bridge.send('VKWebAppJoinGroup', { group_id: Number(process.env.REACT_APP_GROUP) }).then(data => {
          if (data.result) {
            User.setSubscribe(true);
          }
        });
      }, OFFER_SUBSCRIBE_DELAY)
    }
  }

  public async showInterstitialAd(interstitial: boolean): Promise<void> {
    if (interstitial) {
      setTimeout(() => {
        bridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.INTERSTITIAL }).catch(error => {
          console.log(error);
        });
      }, INTERSTITIAL_AD_DELAY)
    }
  }

  public async deleteMeme(meme: Imeme): Promise<void> {
    await this.sendRequest('deleteMeme', { meme: meme.id }).then(res => {
      if (!res.error) {
        State.deleteOneMeme(meme.id)
      }
    });
  }

  public async reportMeme(meme: Imeme, type: reports): Promise<void> {
    await this.sendRequest('strikeMeme', { meme: meme.id, type: type })
  }

  public async deleteComment(comment: Icomment): Promise<void> {
    const response = await this.sendRequest('deleteComment', { comment: comment.id })
    if (!response.error) {
      const responseComments = await this.sendRequest('getCommemts', { meme: State.getMemeOpen() })
      State.setComments(responseComments.data)
    };
  }

  public async reportComment(comment: Icomment, type: reports): Promise<void> {
    await this.sendRequest('strikeComment', { comment: comment.id, type: type })
  }

}

export default new Actions();