export default class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.src,
      
    };
  }

  setUserInfo(name, job, avatar) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    this._userAvatar.src = avatar
  }
}
