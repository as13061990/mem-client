import { makeAutoObservable, runInAction } from 'mobx';
import { ScreenSpinner } from '@vkontakte/vkui';
import { routes, upload } from '../types/enums';

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
      })
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
}

export default new State();