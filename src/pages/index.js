import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/Userinfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import PopUpWithConfirm from "../components/PopUpWithConfirm.js";

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

import { validationSettings } from "../utils/Constants.js";

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//
//Wrappers
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = document.forms["profile__form"];
const addCardForm = addCardModal.querySelector(".modal__form");
const avatarUpdateForm = document.forms["avatar__form"];

//Buttons and DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const avatarUpdateButton = document.querySelector(".profile__image");
//Form Data

const cardTitleInput = addCardForm.querySelector("#card-name-input");
const cardUrlInput = addCardForm.querySelector("#card-link-input");
const avatarUrlInput = avatarUpdateForm.querySelector("#avatar-link-input");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "298dccb5-56b1-425a-ba81-960441ee84bf",
    "Content-Type": "application/json",
  },
});

const avatarCardPopUp = new PopUpWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);

avatarCardPopUp.setEventListeners();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
const updateAvatarValidator = new FormValidator(
  validationSettings,
  avatarUpdateForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormValidator.disableButton();
addFormValidator.disableButton();
updateAvatarValidator.enableValidation();
updateAvatarValidator.disableButton();

/* const closeModal = (modalWindow) => {
  modalWindow.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscapeKey);
}; */

function createCard(item) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.getView();
}

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

function handleProfileEditSubmit(userProfile) {
  popupWithEditForm.renderLoading(true);

  api
    .updateUserInfo(userProfile.name, userProfile.link)
    .then(() => {
      userData.setUserInfo(userProfile.name, userProfile.link);
    })
    .then(() => {
      editFormValidator.disableButton();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithEditForm.renderLoading(false);
    });

  popupWithEditForm.close();
}

function handleAvatarSubmit(data) {
  avatarCardPopUp.renderLoading(true);

  api
    .updateUserAvatar(avatarUrlInput.value)
    .then((res) => {
      userData.setUserAvatar(res.avatar);
    })
    .then(() => {
      console.log("Avatar has been updated");
      updateAvatarValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarCardPopUp.renderLoading(false);
    });

  avatarCardPopUp.close();
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
  popupWithAddForm.renderLoading(true);
  api
    .createCard(data.name, data.link)
    .then((results) => {
      const card = createCard(results);
      cardSection.addItem(card);
    })
    .catch((err) => {
      console.error(`The error is ${err}`);
    })
    .finally(() => {
      popupWithAddForm.renderLoading(false);
    });
  popupWithAddForm.close();
  addFormValidator.disableButton();
}

addNewCardButton.addEventListener("click", () => {
  popupWithAddForm.open();
});


const popUpImageElement = new PopUpWithImage("#card-image-modal");
popUpImageElement.setEventListeners();

function handleCardClick(name, link) {
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


const userData = new UserInfo(profileName, profileDescription, avatar);

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
    userData.setUserAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

const deleteCardPopUp = new PopUpWithConfirm(
  "#delete-card-modal",
  deleteCardSubmit
);

avatarUpdateButton.addEventListener("click", () => {
  avatarCardPopUp.open();
});

function handleLikeClick(card) {
  if (card.isLiked) {
    api.dislikeCard(card._id).then(() => {
      
      card.handleLikeIcon();
      card._isLiked = false;
    })
    .catch((err) => {console.error(err);})
  }
  if (!card.isLiked) {
    api.likeCard(card._id).then(() => {
    
      card.handleLikeIcon();
      card._isLiked = true;
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

function handleDeleteClick(card) {
  deleteCardPopUp.open(() => {
    deleteCardSubmit(card);
  });
}

function deleteCardSubmit(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.handleDeleteCard();
      deleteCardPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

deleteCardPopUp.setEventListeners();
