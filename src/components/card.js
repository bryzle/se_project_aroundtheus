export default class Card {
  constructor(data, cardSelector, handleCardClick,handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector; // cardSelector = "#card-template"
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeClick(this));
    

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteClick(this));

   
    /* this._cardElement.querySelector(".modal-delete-button").addEventListener("submit", () => this.handleDeleteCard()); */


    this._cardImageEl.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );

   
  }

  handleLikeIcon() {
    
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active")
  }
  _toggleLike(){

    if (this._isLiked){
      this._cardElement.querySelector(".card__like-button").classList.add("card__like-button_active")
    }
    else {
      this._cardElement.querySelector(".card__like-button").classList.remove("card__like-button_active")
    }
  }

  handleDeleteCard() {
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
    this._toggleLike();
    return this._cardElement;
  }
}
