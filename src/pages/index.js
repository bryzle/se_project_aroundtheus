import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountain",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//
//Wrappers
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#card-image-modal");
//Buttons and DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const viewCardImageCloseButton =
  previewImageModal.querySelector(".modal__close");
//Form Data

const cardTitleInput = addCardForm.querySelector("#card-name-input");
const cardUrlInput = addCardForm.querySelector("#card-link-input");
const cardsWrap = document.querySelector(".cards__list");
const popupImage = document.querySelector(".modal__image");
const popupCaption = document.querySelector(".modal__caption");

//validation
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1fed014f-8095-47e3-ae36-12d183e8caec",
    "Content-Type": "application/json",
  },
}); */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormValidator.disableButton();
addFormValidator.disableButton();

/* const closeModal = (modalWindow) => {
  modalWindow.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscapeKey);
}; */

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleCardClick);
  return cardElement.getView();
}

/* con = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
}; */

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const userData = new UserInfo(profileName, profileDescription);

function handleProfileEditSubmit() {
  userData.setUserInfo(profileNameInput.value, profileDescriptionInput.value);
  popupWithEditForm.close();
}

profileEditButton.addEventListener("click", () => {
  popupWithEditForm.open();
  const userProfile = userData.getUserInfo();
  profileNameInput.value = userProfile.name;
  profileDescriptionInput.value = userProfile.job;
});

const name = cardTitleInput.value;
const link = cardUrlInput.value;

function handleAddCardSubmit(data) {
  const card = createCard(data);
  cardSection.addItem(card);
  popupWithAddForm.close();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

const cardList = cardSection.renderItems();

addNewCardButton.addEventListener("click", () => {
  popupWithAddForm.open();
});

addCardModalCloseButton.addEventListener("click", () => {
  popupWithAddForm.close();
});

profileModalCloseButton.addEventListener("click", () =>
  popupWithAddForm.close()
);

const popUpImageElement = new PopUpWithImage(
  { name, link },
  "#card-image-modal"
);
popUpImageElement.setEventListeners();

function handleCardClick(name, link) {
  console.log(name, link);
  return popUpImageElement.open(name, link);
}

const popupWithEditForm = new PopupWithForm(
  "#edit-modal",
  handleProfileEditSubmit
);

const popupWithAddForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit
);
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "298dccb5-56b1-425a-ba81-960441ee84bf",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    console.log(result); // log the result to the console
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

api
  .getUserInfo()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
