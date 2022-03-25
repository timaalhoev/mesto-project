
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

const configApi = {
  urlCards: 'https://nomoreparties.co/v1/plus-cohort7/cards',
  urlUser: 'https://nomoreparties.co/v1/plus-cohort7/users/me',
  urlLikes: 'https://nomoreparties.co/v1/plus-cohort7/cards/likes',
  token: '3d57eda9-7790-4f7a-bd35-cb564682d3fd'
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function fetchUser() {
  fetch(configApi.urlUser, {
    headers: {
      authorization: configApi.token
    }
  })
  .then(checkResponse)
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
  fetch(configApi.urlCards, {
    headers: {
      authorization: configApi.token
    }
  })
  .then(checkResponse)
  .then(res => res.forEach(item => renderCard(createCard(item))))
}

function fetchUpdateUser(name, job) {
  return fetch(configApi.urlUser, {
    method: 'PATCH',
    headers: {
      authorization: configApi.token,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
  .then(checkResponse)
  .then((res) => {
    userID = res._id
    updateUser(res)
  })
}

function postCard(labelInput, imageInput) {
  return fetch(configApi.urlCards, {
    method: 'POST',
    headers: {
      authorization: configApi.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:labelInput,
      link: imageInput 
    })
  })
  .then(checkResponse)

}

function setlike(card_id) {
  return fetch(`${configApi.urlLikes}/${card_id}`, {
    method: 'PUT',
    headers: {
      authorization: configApi.token
    },
  })
  .then(checkResponse)
}

function deleteLikeAPI(card_id) {
  return fetch(`${configApi.urlLikes}/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: configApi.token
    },
  })
  .then(checkResponse)
}

function deleteCards(card_id) {
  return fetch(`${configApi.urlCards}/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: configApi.token
    },
  })
  .then(checkResponse)
}

function patchAvatar(image_url) {
  return fetch(`${configApi.urlUser}/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: configApi.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${image_url}`
    })
  })
  .then(checkResponse)
  .then((res) => {
    userID = res._id
    updateUser(res)
  })
}

export { fetchCards, fetchUser, fetchUpdateUser, postCard, deleteLikeAPI, deleteCards, setlike, patchAvatar, userID }
