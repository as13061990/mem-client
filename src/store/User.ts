import { makeAutoObservable } from 'mobx';
import { UserInfo } from '@vkontakte/vk-bridge';

class User {
  constructor() {
    makeAutoObservable(this);
  }
  
  private _user: UserInfo;
  private _nickname: string;
  private _useNickname: boolean;
  private _notification: boolean = false;
  private _subscribe: boolean = false;
  private _memes: number = 0;
  private _ban: boolean = false
  private _member: boolean = false
  
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

  public setNotify(notify: boolean): void {
    this._notification = notify;
  }

  public isNotify(): boolean {
    return this._notification;
  }

  public setSubscribe(subscribe: boolean): void {
    this._subscribe = subscribe;
  }

  public isSubscribe(): boolean {
    return this._subscribe;
  }

  public setMemes(memes: number): void {
    this._memes = memes;
  }

  public getMemes(): number {
    return this._memes;
  }

  public setBan(ban: boolean): void {
    this._ban = ban;
  }

  public getBan(): boolean {
    return this._ban;
  }

  public setMember(member: boolean): void {
    this._member = member;
  }

  public getMember(): boolean {
    return this._member;
  }
}

export default new User();