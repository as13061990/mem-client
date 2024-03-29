import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';
import State from './State';
import User from './User';
import { Alert, ScreenSpinner } from '@vkontakte/vkui';
import { memes, popouts, reports, routes } from '../types/enums';
import axios from 'axios';
import Amplitude from './Amplitude';
import Analytics from './Analytics';

const OFFER_SUBSCRIBE_DELAY: number = 30000
const INTERSTITIAL_DELAY: number = 1000

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
      User.setNickname(res.data.user.name);
      User.setUseNickname(res.data.user.nickname);
      User.setNotify(res.data.user.notify);
      User.setSubscribe(res.data.user.subscribe);
      User.setBan(res.data.user.ban_comments);
      User.setMemes(res.data.user.memes);
      User.setMember(res.data.user.member)


      State.setStories(res.data.stories)
      State.setTimer(res.data.time);

      const search: string = window.location.search
      const params = new URLSearchParams(search)

      if (res.data.user.member) {
        State.setActivePanel(routes.HOME);
        State.setHistory([routes.HOME])
        //@ts-ignore
        // State.setLauchParamsData({...State.getLauchParamsData(), vk_ref: 'third_party_profile_buttons', vk_profile_id: 276669821, vk_user_id: 276669821})
        if (State.getLauchParamsData().vk_ref === 'third_party_profile_buttons' || params.get('vk_ref') === 'third_party_profile_buttons' ) {
          //@ts-ignore
          if (State.getLauchParamsData()?.vk_profile_id === State.getLauchParamsData().vk_user_id || params.get('vk_profile_id') === params.get('vk_user_id') ) {
            State.setActivePanel(routes.HOME);
            State.setHistory([routes.HOME])
            State.setCategory(memes.MY)
          } else {
            //@ts-ignore
            const id = State.getLauchParamsData()?.vk_profile_id ? State.getLauchParamsData()?.vk_profile_id : params.get('vk_profile_id')
            await this.getDataUserProfile(id)
            if (State.getUserProfile().id) {
              State.setActivePanel(routes.USERMEMES);
              State.setCategory(memes.USER)
              State.setHistory([routes.HOME, routes.USERPROFILE, routes.USERMEMES])
              State.getHistory().forEach(panel=> window.history.pushState({ panel: panel }, panel))
            }
          }
        }
      } else {
        State.setActivePanel(routes.INTROFIRST);
        State.setHistory([routes.INTROFIRST])
      }
      State.setAdmin(res.data.admin);
      State.setPopout(null);
      State.setInterstitial(res.data.interstitial)
      State.startInterstitialADTimer()

      this.subscribes();
      this.notifyToSubscribe(res.data.subscribeOffer, res.data.user.subscribe)

      State.setReward(res.data.rewarded);
      console.log(JSON.parse(JSON.stringify((State.getHistory()))))


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
    bridge.send('VKWebAppCheckNativeAds', { ad_format: EAdsFormats.INTERSTITIAL })
      .then((data) => {

        if (data.result) {
          State.setPopout(<ScreenSpinner state='loading' />, popouts.LOADING)

          setTimeout(() => {
            State.setPopout(null)
            bridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.INTERSTITIAL })
              .then(() => { State.amplitude.track('interstitial') })
              .catch(error => {
                console.log(error);
              });
          }, INTERSTITIAL_DELAY)

        }
      })
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