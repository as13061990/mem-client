import { makeAutoObservable, runInAction } from 'mobx';
import { ScreenSpinner } from '@vkontakte/vkui';
import { load, memes, ratings, routes, upload } from '../types/enums';

class State {
  constructor() {
    makeAutoObservable(this);
  }

  private _route: routes = routes.LOADING;
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
  private _ratingCategory: ratings = ratings.TOP_WEEK;
  private _moderation: number = 1;

  public setRoute(route: routes): void {
    if (route === routes.HOME || route === routes.RATING || route === routes.PROFILE || route === routes.ADMIN) {
      this._tab = route;
    }
    this._route = route;
  }

  public getRoute(): routes {
    return this._route;
  }

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
}

export default new State();