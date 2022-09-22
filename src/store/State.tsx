import { makeAutoObservable } from 'mobx';
import { ScreenSpinner, Alert } from '@vkontakte/vkui';
import { routes } from '../types/enums';

class State {
  constructor() {
    makeAutoObservable(this);
  }

  private _route: routes = routes.LOADING;
  private _tab: routes = routes.HOME;
  private _admin: boolean = false;
  private _popout: JSX.Element = <ScreenSpinner state='loading' />;

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
}

export default new State();