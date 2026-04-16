
const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor(address) {
      this._address = address;
    }
  
    // setToken(token) {
    //   this._token = token;
    // }
  
  
    getAppInfo() {
      return Promise.all([this.getCardList(), this.getUserInfo()]);
    }
  
    getCardList() {
      return fetch(`${this._address}/cards`, {
        // headers: {
        //   'Authorization': `Bearer ${this._token}`,
        // },
        credentials: 'include',
      })
      .then(getResponse)
    }
  
    addCard({ name, link }) {
      return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          link,
        }),
      })
      .then(getResponse)
    }
  
    removeCard(cardId) {
      return fetch(`${this._address}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          // 'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
      }).then(getResponse)
    }
  
    getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        headers: {
          // 'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(getResponse)
    }
  
    setUserInfo({ name, about }) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          // 'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          about,
        }),
      })
        .then(getResponse);
    }
  
    setUserAvatar({ avatar }) {
      return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          // 'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar,
        }),
      }).then(getResponse)
    }
  
    changeLikeCardStatus(cardId, like) {
      
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: like ? 'PUT' : 'DELETE',
        credentials: 'include',
        headers: {
          // 'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json',
        },
      }).then(getResponse)
    }
  
    register(email, password) {
      return fetch(`${this._address}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then(getResponse)
    }
  
    login(email, password) {
      return fetch(`${this._address}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
      })
      .then(getResponse)
      // .then((data) => {
      //   this.setToken(data.token);
      //   localStorage.setItem('jwt', data.token)
      //   return data;
      // })
    }
  
    // checkToken(token) {
    //   return fetch(`${this._address}/users/me`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     }
    //   })
    //   .then(getResponse)
    // }

    checkAuth(token) {
      return fetch(`${this._address}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        }
      })
      .then(getResponse)
    }

    signOut() {
      return fetch(`${this._address}/signout`, {
        method: 'POST',
        credentials: 'include',
      }).then(getResponse);
    }
  }
  // Замените на адрес вашего бэкенда
  const api = new Api('https://api.antonkiyan.mesto.nomorepartiessite.ru');
  // const api = new Api('http://localhost:3000');
  
  export default api;
  