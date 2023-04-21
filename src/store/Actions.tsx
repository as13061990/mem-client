import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';
import State from './State';
import User from './User';
import { Alert, ScreenSpinner } from '@vkontakte/vkui';
import { popouts, reports, routes } from '../types/enums';
import axios from 'axios';
import Amplitude from './Amplitude';

const OFFER_SUBSCRIBE_DELAY: number = 30000

class Actions {

  public async getData(): Promise<void> {
    await bridge.send('VKWebAppGetUserInfo').then((data) => {
      if (data.id) {
        User.setUser(data);
      }
    }).catch((er) => {
      State.setPopout(<ScreenSpinner state='error' aria-label='Ошибка' />, popouts.LOADING);
      window.location.reload()
    })
    const res = await this.sendRequest('getData', {});

    if (res.error) {
      console.log('error', res)
      State.setPopout(<ScreenSpinner state='error' aria-label='Ошибка' />, popouts.LOADING);
    } else {
      State.setActivePanel(routes.LOADING);
      User.setNickname(res.data.user.name);
      User.setUseNickname(res.data.user.nickname);
      User.setNotify(res.data.user.notify);
      User.setSubscribe(res.data.user.subscribe);
      User.setBan(res.data.user.ban_comments);
      User.setMemes(res.data.user.memes);
      State.setStories(res.data.stories)
      State.setTimer(res.data.time);
      State.setActivePanel(res.data.user.member ? routes.HOME : routes.INTROFIRST);
      State.setHistory([res.data.user.member ? routes.HOME : routes.INTROFIRST])
      State.setAdmin(res.data.admin);
      State.setPopout(null);
      State.setInterstitial(res.data.interstitial)
      State.startInterstitialADTimer()
      State.amplitude = new Amplitude()
      this.subscribes();
      this.notifyToSubscribe(res.data.subscribeOffer, res.data.user.subscribe)

      State.setReward(res.data.rewarded);
      await bridge.send('VKWebAppCheckNativeAds', { ad_format: EAdsFormats.REWARD })
        .then((data) => {
          if (data.result) {
            const rewarded = data.result && res.data.rewarded;
            State.setReward(rewarded);
          } else {
            State.setReward(false);
          }
        })
        .catch((error) => { console.log(error); State.setReward(false); })
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
    State.setLoading(true)
    const response = await this.sendRequest('getRatings', {})
    State.setRatingUsers(response.data)
    State.setLoading(false)
  }

  public async getDataComments(memeId: number): Promise<void> {
    const response = await this.sendRequest('getComments', { meme: memeId })
    State.setComments(response.data)
  }

  public async sendComment(comment: IcommentSend): Promise<void> {
    await this.sendRequest('sendComment', comment)
    const responseComments = await this.sendRequest('getComments', { meme: State.getMemeOpen() })
    State.setComments(responseComments.data)
    State.memeComment(comment.meme)
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

  public async showInterstitialAd(): Promise<void> {
    bridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.INTERSTITIAL })
      .then(() => { State.amplitude.track('interstitial') })
      .catch(error => {
        console.log(error);
      });
  }

  public async deleteMeme(meme: Imeme): Promise<void> {
    await this.sendRequest('deleteMeme', { meme: meme.id }).then(res => {
      if (!res.error) {
        State.deleteOneMeme(meme.id)
      }
    }).catch(() => {
      State.setPopout(<Alert
        actions={[{
          title: 'Понятно',
          autoclose: true,
          mode: 'cancel'
        }]}
        onClose={() => State.setPopout(null)}
      >
        <p>Что-то пошло не так</p>
      </Alert>, popouts.ALERT)
    });
  }

  public async reportMeme(meme: Imeme, type: reports): Promise<void> {
    await this.sendRequest('strikeMeme', { meme: meme.id, type: type })
  }

  public async deleteComment(comment: Icomment): Promise<void> {
    const response = await this.sendRequest('deleteComment', { comment: comment.id })
    if (!response.error) {
      const responseComments = await this.sendRequest('getComments', { meme: State.getMemeOpen() })
      State.setComments(responseComments.data)
      State.memeCommentDelete(State.getMemeOpen())
    };
  }

  public async reportComment(comment: Icomment, type: reports): Promise<void> {
    await this.sendRequest('strikeComment', { comment: comment.id, type: type })
  }

  public async getDataUserProfile(id: number): Promise<void> {
    State.setLoading(true)
    const response = await this.sendRequest('getUserProfile', { user: id })
    if (!response.error) {
      State.setUserProfile(response.data)
    };
    State.setLoading(false)
  }

  public async banUser(user: IuserProfile, ban: boolean): Promise<void> {
    await this.sendRequest('setBan', { user: user.id, ban_comments: ban })
    const response = await this.sendRequest('getUserProfile', { user: user.id })
    if (!response.error) {
      State.setUserProfile(response.data)
    };
  }

  public async getCommentsStrikes(): Promise<void> {
    State.setLoading(true)
    const response = await this.sendRequest('getCommentsStrikes', {})
    if (!response.error) {
      State.setCommentsStrikes(response.data)
    };
    State.setLoading(false)
  }

  public async getUsersStrikes(): Promise<void> {
    State.setLoading(true)
    const response = await this.sendRequest('getUsersStrikes', {})
    if (!response.error) {
      State.setUsersStrikes(response.data)
    };
    State.setLoading(false)
  }

}

export default new Actions();