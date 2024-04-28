import PopUp from "./PopUp.js";

export default class PopUpWithConfirm extends PopUp{
    constructor(popupSelector, handleFormSubmit) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        this._cardElement = document.querySelector(".card");
}

close() {
    this._popupForm.reset();
    super.close();
  }

  handleDeleteCard(data) {
    this._cardElement.remove(data.id);
    this._cardElement = null;
  }


setEventListeners() {
    super.setEventListeners();;
  
  }
}