import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import PopUp from "../components/PopUp.js";
import PopUpWithForm from "../components/PopupWithForm.js";

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

//Buttons and DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
//Form Data

const cardTitleInput = addCardForm.querySelector("#card-name-input");
const cardUrlInput = addCardForm.querySelector("#card-link-input");

const deleteModalButton = document.querySelector(".card__delete-button");
const deleteCardButton = document.querySelector(".modal-delete-button");
//validation
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "298dccb5-56b1-425a-ba81-960441ee84bf",
    "Content-Type": "application/json",
  },
});

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
  const cardElement = new Card(item, "#card-template", handleCardClick,handleDeleteClick);
  return cardElement.getView();
}

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* deleteModalButton.addEventListener("click", () => {
 deleteCardPopUp.open()

}) */

/* const deleteCardPopUp = new PopupWithForm("#delete-card-modal");
console.log(deleteModalButton); */

function handleProfileEditSubmit() {
  userData.setUserInfo(profileNameInput.value, profileDescriptionInput.value);
  api.updateUserInfo(profileNameInput.value, profileDescriptionInput.value);
  popupWithEditForm.close();
}

profileEditButton.addEventListener("click", () => {
  popupWithEditForm.open();
  const userProfile = userData.getUserInfo();
  console.log(">>User Profile", userProfile);
  profileNameInput.value = userProfile.name;
  profileDescriptionInput.value = userProfile.job;
});

const name = cardTitleInput.value;
const link = cardUrlInput.value;

function handleAddCardSubmit(data) {
  api
    .createCard(data.name, data.link)
    .then((results) => {
      const card = createCard(results);
      cardSection.addItem(card);
    })
    .catch((err) => {
      console.error(`The error is ${err}`);
    });
  popupWithAddForm.close();
}

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

const userData = new UserInfo(profileName, profileDescription);

api
  .getInitialCards()
  .then((cardData) => {
    const cardSection = new Section(
      {
        items: cardData,
        renderer: (item) => {
          const card = createCard(item);
          cardSection.addItem(card);
        },
      },
      ".cards__list"
    );

    const cardList = cardSection.renderItems();
  })

  .catch((err) => {
    console.error(err); // log the error to the console
  });

api
  .getUserInfo()
  .then((data) => {
    userData.setUserInfo(data.name, data.about);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

function deleteCardSubmit(id) {
  api
    .deleteCard(id)
    .then((id) => {
      console.log(id);
    })
    .catch((err) => {
      console.error(err);
    });
}

const deleteCardPopUp = new PopUpWithForm(
  "#delete-card-modal",
  deleteCardSubmit
);



function handleDeleteClick(card){
  deleteCardPopUp.open(card._id)
  deleteCardPopUp.setSubmitAction(() => {
    deleteCardSubmit(card._id)
  })
}

deleteCardButton.addEventListener("click", () => {

  deleteCardPopUp.close();  
});