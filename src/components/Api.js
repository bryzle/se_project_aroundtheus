export default class Api {
  constructor({ headers, baseUrl }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((res) =>{this._checkResponse})
    .then((results) => {
        console.log(results);
      })
  }
  updateUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    })
      .then((res) =>{this._checkResponse}
      )
      .then((results) => {
        console.log(results);
      });
  }

  createCard( {name, link} ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) =>{this._checkResponse})
      .then((results) => {
        console.log(results);
      });
  }

  updateUserAvatar() {}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) =>{this._checkResponse})
      .then((results) => {
        console.log(results);
      });
  }

  deleteCard() {}

  likeCard() {}

  dislikeCard() {}
  // other methods for working with the API
}
