import { makeAutoObservable } from 'mobx';
import { ScreenSpinner } from '@vkontakte/vkui';
import { routes } from '../types/enums';

class State {
  constructor() {
    makeAutoObservable(this);
  }

  private _route: routes = routes.LOADING;
  private _spinner: JSX.Element = <ScreenSpinner state='loading' />;

  public setRoute(route: routes): void {
    this._route = route;
  }

  public getRoute(): routes {
    return this._route;
  }

  public setSpinner(spinner: JSX.Element): void {
    this._spinner = spinner;
  }

  public getSpinner(): JSX.Element {
    return this._spinner;
  }
}

export default new State();