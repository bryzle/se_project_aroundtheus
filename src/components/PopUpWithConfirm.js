import PopUp from "./PopUp.js";

export default class PopUpWithConfirm extends PopUp{
    constructor(popUpSelector) {

    super({popUpSelector});
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
  }


  handleDelete(handleDeleteSubmit) {
    this._handleDeleteSubmit= handleDeleteSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }
}