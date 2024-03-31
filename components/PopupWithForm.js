import Popup from "./PopUp.js";

export default class PopupWithForm extends Popup{
    constructor({popUpSelector, handleFormSubmit}){
        super({popUpSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._popUpForm = popUpSelector.querySelectorAll("modal__form");
    }

    close(){
        this._popupForm.reset();
        super.close();
    }

    _getInputValues(){
        this._inputEls = 
            this._popupForm.querySelectorAll(".modal__input");
        const formValues = [];
        this._inputEls.array.forEach(element => {
            formValues[element.name] = element.value;

        return formValues;
            
        });
        
        
        
    }

    setEventListeners(){
        super.setEventListeners();
        this.PopupWithForm.setEventListeners("submit", (event) =>{
        event.preventdefault();
        const formData = this._getInputValues();
        this._handleFormSubmit(formData);
        this.close();
        }
        );
    }
    
}