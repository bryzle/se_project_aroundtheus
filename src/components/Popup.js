export default class PopUp {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      console.log("escape key");
    }
  }
  _cardClickClose(evt) {
    if (evt.target.classList.contains("modal_open")) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (evt) => {
      this._cardClickClose(evt);
      }
    );
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
