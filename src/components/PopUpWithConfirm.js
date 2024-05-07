import PopUp from "./Popup.js";

export default class PopUpWithConfirm extends PopUp{
    constructor(popupSelector) {

    super({popupSelector});
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

/*   close() {
    super.close();
  }

  open() {
    super.open();
  } */

  handleDelete(handleDeleteSubmit) {
    this._handleDeleteSubmit= handleDeleteSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }
}