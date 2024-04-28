import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );

    //PopupWithConfirm
//setSubmitAction(fn) {
  //this._handleFormSubmit = fn 
  }
  

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const formValues = {};
    this._inputEls.forEach((element) => {
      formValues[element.name] = element.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(this._getInputValues());
    });
  
  }
}
