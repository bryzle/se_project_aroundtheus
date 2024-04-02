import Popup from "./PopUp.js";

export default class PopUpWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._popupElement = document.querySelector(popupSelector);
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupCaption = this._popupElement.querySelector(".modal__caption");
  }

  open() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupCaption.textContent = this._name;

    super.open();
    super.setEventListeners();
  }
}
