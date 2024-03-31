export default class Userinfo{
    constructor(userName,userJob){
        this._userName = userName;
        this._userJob = userJob;
        this._popUpNameInp = this.popUpElement.querySelector(".modal__input_type_name")
        this._popUpJobInp = this.popUpElement.querySelector(".modal__input_type_description")
    }

    getUserInfo(){
        this._popUpNameInp = this._userName.textContent;
        this._popUpJobInp.value = this._userJob.textContent;
    }

    setUserInfo(){
        this._userName = this._popUpNameInp.value;
        this._userJob.textContent = this._popUpJobInp.value;
        super.close();
    }
}