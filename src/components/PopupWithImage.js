import Popup from "./PopUp.js";

export default class PopUpWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    /* this._name = name;
    this._link = link; */
    this._popupElement = document.querySelector(popupSelector);
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.setEventListeners();
    super.open();
  }
  close() {
    super.close();
  }
}
