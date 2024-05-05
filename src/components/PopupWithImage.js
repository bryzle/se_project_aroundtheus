import Popup from "./Popup.js";

export default class PopUpWithImage extends Popup {
  constructor( popupSelector) {
    super(popupSelector,);

    this._popupElement = document.querySelector(popupSelector);

    this._popupImage = this._popupElement.querySelector(".modal__image");

    this._popupCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(name, link) {
    this._popupImage.src = link;

    this._popupImage.alt = name;

    this._popupCaption.textContent = name;

    super.open();
  }

  
}
