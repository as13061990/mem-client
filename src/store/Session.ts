import { makeAutoObservable } from 'mobx';

class Session {
  constructor() {
    makeAutoObservable(this);
  }

  private _memesNotif: boolean = true;

  public getMemesNotif(): boolean {
    return this._memesNotif;
  }

  public clearMemesNotif(): void {
    this._memesNotif = false;
  }
}

export default new Session;