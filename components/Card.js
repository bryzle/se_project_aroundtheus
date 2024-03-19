const previewImageModal = document.querySelector(".card__image-modal");
const popupImage = document.querySelector(".modal__image");
const popupCaption = document.querySelector(".modal__caption");
const ESC_KEYCODE = 27;

const openModal = (modalWindow) => {
  modalWindow.classList.add("modal_open");
  document.addEventListener("keydown", handleEscapeKey);
};

const closeModal = (modalWindow) => {
  modalWindow.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscapeKey);
};

const handleEscapeKey = (evt) => {
  evt.preventDefault();

  const activePopup = document.querySelector(".modal_open");

  if (evt.which === ESC_KEYCODE) {
    closeModal(activePopup);
  }
};

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector; // cardSelector = "#card-template"
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handeLikeIcon());

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._cardImageEl.addEventListener("click", () => this._handleCardClick());
  }

  _handleCardClick() {
    this._previewImageModal = document.querySelector("#card-image-modal");
    this._popupImage = document.querySelector(".modal__image");
    this._popupCaption = document.querySelector(".modal__caption");
    this._popupImage.src = this._link;
    this._popupCaption.textContent = this._name;

    openModal(this._previewImageModal);
  }

  _handeLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    //get the card view
    //set event listeners,
    // return the card

    this._cardImageEl.src = this._link;
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
