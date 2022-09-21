import { makeAutoObservable } from 'mobx';
import { ScreenSpinner } from '@vkontakte/vkui';
import { routes } from '../types/enums';

class State {
  constructor() {
    makeAutoObservable(this);
  }

  private _route: routes = routes.LOADING;
  private _tab: routes = routes.HOME;
  private _spinner: JSX.Element = <ScreenSpinner state='loading' />;
  private _admin: boolean = false;

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

  public setSpinner(spinner: JSX.Element): void {
    this._spinner = spinner;
  }

  public getSpinner(): JSX.Element {
    return this._spinner;
  }

  public setAdmin(admin: boolean): void {
    this._admin = admin;
  }

  public isAdmin(): boolean {
    return this._admin;
  }
}

export default new State();