import { UserInfo } from "@vkontakte/vk-bridge";

class User {
  
  private _user: UserInfo;
  
  public getUser(): UserInfo {
    return this._user;
  }

  public setUser(user: UserInfo): UserInfo {
    this._user = user;
    return this._user;
  }
}

export default new User();