import { makeAutoObservable, runInAction } from 'mobx';
import { ScreenSpinner } from '@vkontakte/vkui';
import { load, memes, ratings, routes, upload } from '../types/enums';
import bridge from '@vkontakte/vk-bridge';

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

  public goBack(): void {
    if (this._history.length === 1) {
      bridge.send("VKWebAppClose", { "status": "success" });
    } else if (this._history.length > 1) {
      this._history.pop()
      const newPanel: routes = this._history[this._history.length - 1]
      this._activePanel = newPanel
      if (newPanel === routes.HOME || newPanel === routes.RATING || newPanel === routes.PROFILE || newPanel === routes.ADMIN) {
        this._tab = newPanel;
      }
    }
  }

  public goToPage = (panel: routes) => {
    window.history.pushState({ panel: panel }, panel);
    if (panel === routes.HOME || panel === routes.RATING || panel === routes.PROFILE || panel === routes.ADMIN) {
      this._tab = panel;
    }
    this._activePanel = panel;
    this._history.push(panel);
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

  public setPopout(spinner: JSX.Element): void {
    this._popout = spinner;
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

  public addOneComment(comment: Icomment, id: number): void {
    const memes: Imeme[] = JSON.parse(this._memes);
    const meme = memes.find(data => data.id === id);
    meme.comments++
    this._memes = JSON.stringify(memes);
    this._comments.unshift(comment)
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

  public setActiveModal(modal: string): void {
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
}

export default new State();