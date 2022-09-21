import { UserInfo } from '@vkontakte/vk-bridge';

class User {
  
  private _user: UserInfo;
  private _nickname: string;
  private _useNickname: boolean;
  
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
}

export default new User();