import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const viewCardImageCloseButton = previewImageModal.querySelector(
  "#image-close-button"
);
const modalForms = document.querySelectorAll(".modal__form");
//Form Data
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
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

const formValidator = {};
const buttonValidator = {};

const enableValidation = (validationSetting) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSetting, formElement);

    const formName = formElement.getAttribute("name");

    formValidator[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

/* const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation(); */

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleEscapeKey);
}
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_open");
    closeModal(modal);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscapeKey);
}

function createCard(item) {
  const cardElement = new Card(item, "#card-template");
  return cardElement.getView();
}

const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
};

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  addCardForm.reset();
  closeModal(addCardModal);
}

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

// function closeModalEscape(modal, evt) {
//   document.addEventListener("keydown", (evt) => {
//     if (evt.key === "Escape") {
//       closeModal(modal);
//     }
//   });
// }

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
