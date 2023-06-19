import { makeAutoObservable, runInAction } from 'mobx';
import { ScreenSpinner } from '@vkontakte/vkui';
import { admins, load, memes, modals, popouts, ratings, routes, upload } from '../types/enums';
import bridge, { GetLaunchParamsResponse } from '@vkontakte/vk-bridge';
import Actions from './Actions';
import Amplitude from './Amplitude';
import User from './User';

class State {
  constructor() {
    makeAutoObservable(this);
  }

  private _tab: routes = routes.HOME;
  private _admin: boolean = false;
  private _popout: JSX.Element = <ScreenSpinner state='loading' />;
  private _file: File = null;
  private _uploadState: upload = upload.INPUT;
  private _timer: number;
  private _reward: boolean = false;
  private _memes: string;
  private _memesIteration: number = 0;
  private _loadingMemes: load = load.LAZY;
  private _category: memes = memes.TIME;
  private _memeOpen: number;
  private _comments: Icomment[] = [];
  private _history: routes[] = []
  private _historyPopouts: (modals | popouts)[] = []
  private _activePanel: routes = routes.LOADING
  private _ratingUsers: IratingUsers = { all: [], week: [] }
  private _ratingCategory: ratings = ratings.TOP_ALL;
  private _moderation: number = 1;
  private _swipe: boolean = false;
  private _stories: boolean = false;
  private _snackbar: JSX.Element = null;
  private _activeModal: string = null;
  private _reportMeme: Imeme = null;
  private _reportComment: Icomment = null;
  private _platform: string = null;
  private _reportInfo: Istrikes = null
  private _userProfile: IuserProfile = null
  private _loading: boolean = false
  private _interstitial: boolean = false
  private _interstitialADTimer: boolean = false
  private _INTERSTITIAL_AD_DELAY: number = 60000
  private _adminCategory: admins = admins.MEMES
  private _commentsStrikes: Icomment[] = []
  private _usersStrikes: IuserStrikes[] = []
  private _activeSubscribesAlert: boolean = false
  private _devUsersID: number[] = [276669821, 191781124]
  private _rewardedButton: boolean = true
  private _lauchParamsData: string = null
  public amplitude: Amplitude = null


  public getLauchParamsData(): GetLaunchParamsResponse {
    return JSON.parse(this._lauchParamsData)
  }

  public setLauchParamsData(lauchParamsData: GetLaunchParamsResponse): void {
     this._lauchParamsData =  JSON.stringify(lauchParamsData)
  }

  public getRewardedButton(): boolean {
    return this._rewardedButton
  }

  public setRewardedButton(active: boolean): void {
     this._rewardedButton = active
  }

  public goBack(): void {
    if (this._historyPopouts.length !== 0) {
      switch (this._historyPopouts[this._historyPopouts.length - 1]) {
        case popouts.COMMENTS:
          if (this._history[this._history.length - 1] === routes.USERPROFILE) {
            this._history.pop()
            const newPanel: routes = this._history[this._history.length - 1]
            this._activePanel = newPanel
            return
          }
          this.setMemeOpen(-1)
          break;
        case popouts.ALERT:
        case popouts.ACTION:
          this._popout = null
          break;
        case modals.REPORT:
        case modals.REPORTINFO:
        case modals.RULES:
          this._activeModal = null
          break;
      }
      this._historyPopouts.pop()
    } else {
      if (this._history.length === 1) {
        bridge.send("VKWebAppClose", { "status": "success" });
      } else if (this._history.length > 1) {
        this._history.pop()
        const newPanel: routes = this._history[this._history.length - 1]
        this._activePanel = newPanel
        if (newPanel === routes.HOME || newPanel === routes.RATING || newPanel === routes.MYPROFILE || newPanel === routes.ADMIN) {
          if (!this.getInterstitialADTimer()) {
            Actions.showInterstitialAd()
            this.startInterstitialADTimer()
          }
          this._tab = newPanel;
        }
      }
    }
  }

  public goToPage = (panel: routes) => {
    if (panel !== this._history[this._history.length - 1]) {
      window.history.pushState({ panel: panel }, panel);
      if (panel === routes.HOME || panel === routes.RATING || panel === routes.MYPROFILE || panel === routes.ADMIN) {
        if (!this.getInterstitialADTimer()) {
          Actions.showInterstitialAd()
          this.startInterstitialADTimer()
        }
        this._tab = panel;
      }
      this._activePanel = panel;
      this._history.push(panel);
    }
  };

  public getTab(): routes {
    return this._tab;
  }

  public setAdmin(admin: boolean): void {
    this._admin = admin;
  }

  public isAdmin(): boolean {
    return this._admin;
  }

  public setPopout(popout: JSX.Element, type?: popouts): void {
    if (type !== popouts.LOADING && type) {
      this._historyPopouts.push(type);
      window.history.pushState({ modal: type }, type);
    } else if (popout === null && !type) {
      this._historyPopouts.pop()
    }
    this._popout = popout;
  }

  public getPopout(): JSX.Element {
    return this._popout;
  }

  public setFile(file: File): void {
    this._file = file;
  }

  public getFile(): File {
    return this._file;
  }

  public getUploadState(): upload {
    return this._uploadState;
  }

  public setUploadState(state: upload): void {
    this._uploadState = state;
  }

  public setTimer(timer: number): void {
    this._timer = timer;
    setInterval((): void => {
      runInAction(() => {
        this._timer--;
        this._timer <= 0 && window.location.reload();
      });
    }, 1000);
  }

  public getTimer(): number {
    return this._timer;
  }

  public setReward(reward: boolean): void {
    this._reward = reward;
  }

  public getReward(): boolean {
    return this._reward;
  }

  public getMemes(): Imeme[] {
    try {
      return JSON.parse(this._memes);
    } catch (e) {
      return [];
    }
  }

  public setMemes(memes: Imeme[]): void {
    memes = this._boolOpinions(memes);
    this._memes = JSON.stringify(memes);
  }

  public addMemes(memes: Imeme[]): void {
    memes = this._boolOpinions(memes);
    const oldArray = JSON.parse(this._memes);
    const newArray = oldArray.concat(memes);
    this._memes = JSON.stringify(newArray);
  }

  public memeOpinion(id: number): void {
    const memes: Imeme[] = JSON.parse(this._memes);
    const meme = memes.find(data => data.id === id);
    meme.opinion = !meme.opinion;
    meme.opinion ? meme.likes++ : meme.likes--;
    this._memes = JSON.stringify(memes);
  }

  public memeShare(id: number): void {
    const memes: Imeme[] = JSON.parse(this._memes);
    const meme = memes.find(data => data.id === id);
    meme.share++;
    this._memes = JSON.stringify(memes);
  }

  public memeComment(id: number): void {
    const memes: Imeme[] = JSON.parse(this._memes);
    const meme = memes.find(data => data.id === id);
    meme.comments++;
    this._memes = JSON.stringify(memes);
  }

  public memeCommentDelete(id: number): void {
    const memes: Imeme[] = JSON.parse(this._memes);
    const meme = memes.find(data => data.id === id);
    meme.comments--;
    this._memes = JSON.stringify(memes);
  }

  private _boolOpinions(memes: Imeme[]): Imeme[] {
    for (const meme of memes) meme.opinion = Boolean(meme.opinion);
    return memes;
  }

  public getLoadMemes(): load {
    return this._loadingMemes;
  }

  public setLoadMemes(load: load): void {
    this._loadingMemes = load;
  }

  public setMemesIteration(i: number): void {
    this._memesIteration = i;
  }

  public getMemesIteration(): number {
    return this._memesIteration;
  }

  public setCategory(type: memes): void {
    this._category = type;
  }

  public getCategory(): memes {
    return this._category;
  }

  public markModeration(): void {
    this._moderation++;
  }

  public getModeration(): number {
    return this._moderation;
  }

  public setRatingCategory(type: ratings): void {
    this._ratingCategory = type;
  }

  public getRatingCategory(): ratings {
    return this._ratingCategory;
  }

  public setRatingUsers(users: IratingUsers): void {
    this._ratingUsers = users;
  }

  public getRatingUsers(): IratingUsers {
    return this._ratingUsers;
  }

  public setComments(comments: Icomment[]): void {

    this._comments = comments;
  }

  public getComments(): Icomment[] {
    return this._comments;
  }

  public setMemeOpen(memeId: number): void {
    this._memeOpen = memeId;
  }

  public getMemeOpen(): number {
    return this._memeOpen;
  }

  public setHistory(history: routes[]): void {
    this._history = history
  }

  public getHistory(): routes[] {
    return this._history;
  }

  public setActivePanel(route: routes) {
    this._activePanel = route;
  }

  public getActivePanel(): routes {
    return this._activePanel;
  }

  public setSwipe(swipe: boolean) {
    this._swipe = swipe;
  }

  public getSwipe(): boolean {
    return this._swipe;
  }

  public setStories(stories: boolean) {
    this._stories = stories;
  }

  public getStories(): boolean {
    return this._stories;
  }

  public deleteOneMeme(id: number): void {
    const memes: Imeme[] = JSON.parse(this._memes);
    const memeId = memes.findIndex(data => data.id === id);
    memes.splice(memeId, 1)
    this._memes = JSON.stringify(memes);
  }

  public getSnackbar(): JSX.Element {
    return this._snackbar
  }

  public setActiveModal(modal: modals): void {
    if (modal !== null) {
      this._historyPopouts.push(modal);
      window.history.pushState({ modal: modal }, modal);
    } else {
      this._historyPopouts.pop()
    }
    this._activeModal = modal
  }

  public getActiveModal(): string {
    return this._activeModal
  }

  public setSnackbar(snackbar: JSX.Element): void {
    this._snackbar = snackbar
  }

  public setReportMeme(meme: Imeme): void {
    this._reportMeme = meme
  }

  public getReportMeme(): Imeme {
    return this._reportMeme
  }

  public setPlatform(platform: string): void {
    this._platform = platform
  }

  public getPlatform(): string {
    return this._platform
  }

  public setReportComment(comment: Icomment): void {
    this._reportComment = comment
  }

  public getReportComment(): Icomment {
    return this._reportComment
  }

  public setReportInfo(info: Istrikes): void {
    this._reportInfo = info
  }

  public getReportInfo(): Istrikes {
    return this._reportInfo
  }

  public setUserProfile(info: IuserProfile): void {
    this._userProfile = info
  }

  public getUserProfile(): IuserProfile {
    return this._userProfile
  }

  public setLoading(loading: boolean): void {
    this._loading = loading
  }

  public getLoading(): boolean {
    return this._loading
  }

  public startInterstitialADTimer(): void {
    if (this.getInterstitial()) {
      this._interstitialADTimer = true
      setTimeout(() => {
        this._interstitialADTimer = false
        this._INTERSTITIAL_AD_DELAY *= 2
      }, this._INTERSTITIAL_AD_DELAY)
    }
  }

  public getInterstitialADTimer(): boolean {
    return this._interstitialADTimer
  }

  public setInterstitial(interstitial: boolean): void {
    this._interstitial = interstitial
  }

  public getInterstitial(): boolean {
    return this._interstitial
  }

  public setAdminCategory(category: admins): void {
    this._adminCategory = category
  }

  public getAdminCategory(): admins {
    return this._adminCategory
  }

  public setCommentsStrikes(comments: Icomment[]): void {
    this._commentsStrikes = comments
  }

  public getCommentsStrikes(): Icomment[] {
    return this._commentsStrikes
  }

  public setUsersStrikes(users: IuserStrikes[]): void {
    this._usersStrikes = users
  }

  public getUsersStrikes(): IuserStrikes[] {
    return this._usersStrikes
  }

  public setActiveSubscribesAlert(active: boolean): void {
    this._activeSubscribesAlert = active
  }

  public getActiveSubscribesAlert(): boolean {
    return this._activeSubscribesAlert
  }

  public isDev(): boolean {
    const id = User?.getUser()?.id
    return this._devUsersID?.indexOf(id) !== -1
  }

}


export default new State();