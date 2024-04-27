export default class Card {
  constructor(data, cardSelector, handleCardClick,handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector; // cardSelector = "#card-template"
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handeLikeIcon());

  this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteClick(this)) 

    this._cardImageEl.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
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
