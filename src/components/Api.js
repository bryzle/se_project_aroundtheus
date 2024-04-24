export default class Api {
  constructor({ headers, baseUrl }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .then((results) => {
        console.log(results);
      });
  }
  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .then((results) => {
        console.log(results);
      });
  }

  createCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .then((res) => {
        console.log(res);
      });
  }

  updateUserAvatar() {}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => {
        this._checkResponse(res);
      })
      .then((results) => {
        console.log(results);
      });
  }

  deleteCard() {}

  likeCard() {}

  dislikeCard() {}
  // other methods for working with the API
}
