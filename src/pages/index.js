import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import PopUpWithConfirm from "../components/PopUpWithConfirm.js";
import { validationSettings } from "../utils/Constants.js";


//
//Wrappers
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = document.forms["profile__form"];
const addCardForm = addCardModal.querySelector(".modal__form");
const avatarUpdateForm = document.forms["avatar__form"];
const deleteCardForm = document.forms["modal__delete-form"];
const modalDeleteBtn = deleteCardForm.querySelector(".modal-delete-button");
//Buttons and DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const avatarUpdateButton = document.querySelector(".profile__avatar-button");
//Form Data
const trashButton = document.querySelector(".card__delete-button");
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


function createCard(item) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleCardClick,
    deleteCardSubmit,
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
  popUpWithEditForm.renderLoading(true);

  api
    .updateUserInfo(userProfile.name, userProfile.link)
    .then(() => {
      userData.setUserInfo(userProfile.name, userProfile.link);
    })
    .then(() => {
      editFormValidator.disableButton();
      popUpWithEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popUpWithEditForm.renderLoading(false);
    });
}

function handleAvatarSubmit(data) {
  avatarCardPopUp.renderLoading(true);
  
  api
    .updateUserAvatar(data.link)
    .then((res) => {
      userData.setUserAvatar(res.avatar);
    })
    .then(() => {
      console.log("Avatar has been updated");
      updateAvatarValidator.disableButton();
      avatarCardPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarCardPopUp.renderLoading(false);
    });

  
}

profileEditButton.addEventListener("click", () => {
  popUpWithEditForm.open();
  const userProfile = userData.getUserInfo();
  profileNameInput.value = userProfile.name;
  profileDescriptionInput.value = userProfile.job;
  
});


function handleAddCardSubmit(data) {
  popUpWithAddForm.renderLoading(true);
  api
    .createCard(data.name, data.link)
    .then((results) => {
      const card = createCard(results);
      cardSection.addItem(card);
      popUpWithAddForm.close();
      addFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(`The error is ${err}`);
    })
    .finally(() => {
      popUpWithAddForm.renderLoading(false);
    });
  
  
}

addNewCardButton.addEventListener("click", () => {
  popUpWithAddForm.open();
});


const popUpImageElement = new PopUpWithImage("#card-image-modal");
popUpImageElement.setEventListeners();

function handleCardClick(name, link) {
  return popUpImageElement.open(name, link);
}

const popUpWithEditForm = new PopupWithForm(
  "#edit-modal",
  handleProfileEditSubmit
);

const popUpWithAddForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit
);

popUpWithEditForm.setEventListeners();
popUpWithAddForm.setEventListeners();


const userData = new UserInfo(profileName, profileDescription, avatar);

let cardSection;
api
  .getInitialCards()
  .then((cardData) => {
     cardSection = new Section(
      {
        items: cardData,
        renderer: (item) => {
          const card = createCard(item);
          cardSection.addItem(card);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
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
  "#delete-card-modal"
);

deleteCardPopUp.setEventListeners();


avatarUpdateButton.addEventListener("click", () => {
  avatarCardPopUp.open();
});

function handleLikeClick(card) {
  console.log(card)
  if (card.isLiked) {
    api.dislikeCard(card._id).then(() => {
      
      card.handleLikeIcon();
      card.isLiked = false;
    })
    .catch((err) => {console.error(err);})
  }
  if (!card.isLiked) {
    api.likeCard(card._id).then(() => {
    
      card.handleLikeIcon();
      card.isLiked = true;
    })
    .catch((err) => {
      console.error(err);
    });
  }
}




function deleteCardSubmit(card) {
  deleteCardPopUp.open();
  console.log(card._id)
  deleteCardPopUp.handleDelete(() => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.handleDeleteCard();
      deleteCardPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    });
  })
}

