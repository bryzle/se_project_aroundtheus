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
    }).then(this._checkResponse);
  }
  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

<<<<<<< HEAD
  createCard({userName, URL}) {
    return fetch(`${this._baseUrl}/cards`, {
     method: "POST",
     headers: this._headers,
     body: JSON.stringify({
      name: userName,
       link: URL,
     }),
   }).then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Error: ${res.status}`);
   })
  .then(() => {
    console.log(URL);
  }); 
 }
=======
  createCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }
>>>>>>> 511365b5299f7bcd199bcbc715f355fa29fc9d76

  updateUserAvatar() {}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  deleteCard(id) {

    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse)
    .then(console.log("Card has been deleted"))
  }

  likeCard() {}

  dislikeCard() {}
  // other methods for working with the API
}
