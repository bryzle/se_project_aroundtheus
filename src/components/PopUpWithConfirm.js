import PopUp from "./PopUp.js";

export default class PopUpWithConfirm extends PopUp{
    constructor(popupSelector) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._cardElement = document.querySelector(".card");
}

close() {
    this._popupForm.reset();
    super.close();
  }

  open(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
    super.open();
    
  }


setEventListeners() {
    super.setEventListeners();;
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
    });
  }
}