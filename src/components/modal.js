import { renderCard, createCard } from './card'
import { disableButton } from './validate'
import { fetchUpdateUser, postCard, patchAvatar } from './api'

export const labelInput = document.querySelector('.field__label')
export const imageInput = document.querySelector('.field__image')
export const placeButton = document.querySelector('.popup__button_place')
export const userButton = document.querySelector('.popup__button_user')
export const nameInput = document.querySelector('.field__name')
export const jobInput = document.querySelector('.field__job')
export const title = document.querySelector('.profile__title')
export const subtitle = document.querySelector('.profile__subtitle')
export const avatar = document.querySelector('.profile__image')
export const popupUser = document.querySelector('.popup_user')
export const formUser = document.querySelector('.form__user')
export const popupPlace = document.querySelector('.popup_place')
export const formPlace = document.querySelector('.form__place')
export const popupAvatar = document.querySelector('.popup_avatar')
export const formAvatar = document.querySelector('.form__avatar')
//попап редактирования аватара и его элементы
export const buttonAvatar = document.querySelector('.profile__button_act_avatar')
export const popupAvatarButton = document.querySelector('.popup__button-avatar')
export const inputAvatar = document.querySelector('.form__input-avatar')


function submitFormPlaceHandler(config) {
  renderLoading(true, placeButton)
  postCard(labelInput.value, imageInput.value)
  .then(data => {
    const newCard = createCard({
      ...data
    })

    renderCard(newCard, 'at_first')
    formPlace.reset()
    closePopup(popupPlace)
    disableButton(placeButton, config)
  })
  .finally(() => {
    renderLoading(false, placeButton)
  })
}

export function renderLoading (isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function submitFormUserHandler (config) {
  renderLoading(true, userButton)
  // достаю значения из инпутов формы
  const name = nameInput.value
  const job = jobInput.value
  fetchUpdateUser(name, job).then(() => {
    closePopup(popupUser) // вызываю функцию закрывающую popup
    disableButton(userButton, config)
  })
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    renderLoading(false, userButton);
  })
}

function submitFormAvatarHandler (config) {
  renderLoading(true, popupAvatarButton)
  const avatar = inputAvatar.value
  patchAvatar(avatar).then(() => {
    disableButton(popupAvatarButton, config)
    formAvatar.reset()
    closePopup(popupAvatar) // вызываю функцию закрывающую popup
  })
  .catch((error) => console.log(`Ошибка: ${error}`))
  .finally(() => {
    renderLoading(false, popupAvatarButton);
  })
}

function overlayHandler(event) {
  event.target.classList.remove('popup_opened')
}

//функция закрытия попапа при нажатии ESC

function closeByEsape(event) {
  const key = event.key;
  if (key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function openPopup(el) {
  el.classList.add('popup_opened')
  el.addEventListener('click', overlayHandler)
  document.addEventListener('keydown', closeByEsape);
}

function closePopup(el) {
  el.classList.remove('popup_opened')
  el.removeEventListener('click', overlayHandler)
  document.removeEventListener('keydown', closeByEsape);
}

export { submitFormUserHandler, submitFormPlaceHandler, submitFormAvatarHandler, openPopup, closePopup }