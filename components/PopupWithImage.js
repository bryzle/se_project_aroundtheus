import Popup from "./PopUp.js";

export default class PopUpWithImage extends Popup{
    constructor({name,link},popUpSelector){
        super(popUpSelector)
        this._name = name;
        this._link = link;
    }

    open(){
        const popupImage = this._popupElement.querySelector(".modal__image");
        const popupCaption = this._popupElement.querySelector(".modal__caption");

        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        
        super.open();
        super.setEventListeners();
    
    }

}