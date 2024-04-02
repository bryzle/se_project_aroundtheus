export default class Userinfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
    this._popUpNameInp = document.querySelector(".modal__input_type_name");
    this._popUpJobInp = document.querySelector(
      ".modal__input_type_description"
    );
  }

  getUserInfo() {
    this._popUpNameInp.value = this._userName.textContent;
    this._popUpJobInp.value = this._userJob.textContent;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
