import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super({ popUpSelector });
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = Array.from(
      this._popUpForm.querySelectorAll(".modal__input"));
    this._submitBtn = this._popUpForm.querySelector(".modal__button");
      }
  

  close() {
    this._popUpForm.reset();
    super.close();
  }

  _getInputValues() {
    const formValues = {};
    this._inputEls.forEach((element) => {
      formValues[element.name] = element.value;
    });

    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      ;
    })
  
  }
}
