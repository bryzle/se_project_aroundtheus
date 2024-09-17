import Popup from "./PopUp.js";

export default class PopUpWithImage extends Popup {
  constructor( popUpSelector) {
    super({popUpSelector});



    this._popUpImage = this._popUpElement.querySelector(".modal__image");

    this._popUpCaption= this._popUpElement.querySelector(".modal__caption");
  }

  open(name, link) {
    this._popUpImage.src = link;

    this._popUpImage.alt = name;

    this._popUpCaption.textContent = name;

    super.open();
  }

  
}
