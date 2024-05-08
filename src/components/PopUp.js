export default class PopUp {
  constructor({ popUpSelector }) {
    this._popUpElement = document.querySelector(popUpSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popUpElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);

  }

  close() {
    this._popUpElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close();

    }
  }


  _handleOverlay(evt) {
    if (evt.target.classList.contains("modal_open")) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton = this._popUpElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popUpElement.addEventListener("click", (evt) => {
      this._handleOverlay(evt);
      });

  }
}
