import { UserInfo } from '@vkontakte/vk-bridge';

class User {
  
  private _user: UserInfo;
  private _nickname: string;
  private _useNickname: boolean;
  private _notification: boolean = true;
  private _subscribe: boolean = false;
  
  public getUser(): UserInfo {
    return this._user;
  }

  public setUser(user: UserInfo): void {
    this._user = user;
  }

  public setNickname(nickname: string): void {
    this._nickname = nickname;
  }

  public getNickname(): string {
    return this._nickname;
  }

  public setUseNickname(useNickname: boolean): void {
    this._useNickname = useNickname;
  }

  public getUseNickname(): boolean {
    return this._useNickname;
  }

  public setNotif(notif: boolean): void {
    this._notification = notif;
  }

  public isNotif(): boolean {
    return this._notification;
  }

  public setSubscrib(subscribe: boolean): void {
    this._subscribe = subscribe;
  }

  public isSubscribe(): boolean {
    return this._subscribe;
  }
}

export default new User();