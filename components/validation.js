export class FormValidation {
  constructor(config, formEl) {
    this._config = config;
    this._formEl = formEl;
  }

  enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners(formEl, options);
    });
  }

  _checkInputValidity(formEl, options, inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(formEl, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);
  }

  _setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(formEl, options, inputEl);
        this.toggleButtonState(inputEls, submitButton, options);
      });
    });
  }
  // disableButton
  disableButton(submitButton, { inactiveButtonClass }) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  // enableButton
  enableButton(submitButton, { inactiveButtonClass }) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      // submitButton.classList.add(inactiveButtonClass);
      // submitButton.disabled = true;
      // return;
      disableButton(submitButton, { inactiveButtonClass });
      return;
    }

    enableButton(submitButton, { inactiveButtonClass });
  }
}

// enabling validation by calling enableValidation()
// pass all the settings on call
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = " ";
  errorMessageEl.classList.remove(errorClass);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

enableValidation(config);

export { showInputError, hideInputError, hasInvalidInput, enableValidation };

const formElement = document.querySelector(".modal__form");
const formValidation = new FormValidation(config, formElement);
formValidation.enableValidation(config);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
