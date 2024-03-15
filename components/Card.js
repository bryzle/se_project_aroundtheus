const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#edit-modal");
const previewImageModal = document.querySelector("#card-image-modal");
const addCardModal = document.querySelector("#add-card-modal");
const viewCardImageCloseButton = previewImageModal.querySelector(
  "#image-close-button"
);
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const cardElement = cardTemplate.cloneNode(true);
const cardImageEl = cardElement.querySelector(".card__image");
const cardTitleEl = cardElement.querySelector(".card__title");
const likeButton = cardElement.querySelector(".card__like-button");
const deleteButton = cardElement.querySelector(".card__delete-button");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    console.log({ name, link });
  }

  _setEventListeners(cardData) {
    this._data.src.addEventListener("click", () => handleCardClick(cardData));
    this.cardImageEl.addEventListener("click", () => {
      this.handleCardClick(this);
    });
    profileEditButton.addEventListener("click", () => {
      profileNameInput.value = profileName.textContent;
      profileDescriptionInput.value = profileDescription.textContent;
      openModal(profileEditModal);
    });
    addNewCardButton.addEventListener("click", () => {
      openModal(addCardModal);
    });
    addCardModalCloseButton.addEventListener("click", () => {
      closeModal(addCardModal);
    });

    profileModalCloseButton.addEventListener("click", () =>
      closeModal(profileEditModal)
    );

    viewCardImageCloseButton.addEventListener("click", () =>
      closeModal(previewImageModal)
    );

    addCardModal.addEventListener("click", (evt) => {
      if (evt.target == addCardModal) {
        closeModal(addCardModal);
      }
    });

    profileEditModal.addEventListener("click", (evt) => {
      if (evt.target == profileEditModal) {
        closeModal(profileEditModal);
      }
    });

    previewImageModal.addEventListener("click", (evt) => {
      if (evt.target == previewImageModal) {
        closeModal(previewImageModal);
      }
    });
  }
  _deleteButton() {
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }
  _likebutton() {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
  }
  renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
  }
}
