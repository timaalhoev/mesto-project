import {
  cohort,
  token
} from '../constants'
import {
  renderCard,
  createCard,
} from './card'
import {
  title,
  subtitle,
  avatar,
} from './modal'

let userID = null

function fetchUser() {
  fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
    if (res.ok) return res.json();
    Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    userID = res._id
    updateUser(res)
  })
}

const updateUser = (res) => {
  title.textContent = res.name
  subtitle.textContent = res.about
  avatar.setAttribute('src', res.avatar)
}

function fetchCards() {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
    if (res.ok) return res.json();
    Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => res.forEach(item => renderCard(createCard(item))))
  
}

function fetchUpdateUser(name, job) {
  fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => updateUser(res)) 
}

function postCard(labelInput, imageInput) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:labelInput,
      link: imageInput 
    })
  })
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })

}

function setlike(card_id) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${card_id}`, {
    method: 'PUT',
    headers: {
      authorization: token
    },
  })
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function deleteLikeAPI(card_id) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    },
  })
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export { fetchCards, fetchUser, fetchUpdateUser, postCard, deleteLikeAPI, setlike, userID }
