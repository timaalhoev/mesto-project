import "./index.css"
import { 
  openPopup, 
  closePopup,
  nameInput,
  jobInput,
  title,
  subtitle,
  popupUser,
  popupPlace,
} from "./components/modal"
import { popupImage } from "./components/card"
import { enableValidation } from "./components/validate"

const edit = document.querySelector('.profile__edit-button')
const plus = document.querySelector('.profile__button')
/* нахожу элементы попапа popup_user */
const closePopupUser = document.querySelector('.popup_user .popup__close')
/* нахожу элементы попапа popup_place */
const closePopupPlace = document.querySelector('.popup_place .popup__close')
/* нахожу элементы попапа popup_image */
const closePopupImage = document.querySelector('.popup_image .popup__close')
/* нахожу template карточки места */
const templateLocation = document.getElementById('template__location')

const addButton = document.querySelector('.popup__button');

/* открываем и закрываем попап "Редактировать профиль" */
edit.addEventListener('click', () => {
  nameInput.value = title.textContent
  jobInput.value = subtitle.textContent
  openPopup(popupUser)
})
closePopupUser.addEventListener('click', () => closePopup(popupUser))

/* открываем и закрываем попап "Новое место" */
plus.addEventListener('click', () => openPopup(popupPlace))
closePopupPlace.addEventListener('click', () => closePopup(popupPlace))
/* закрываем попап "Изображение" */
closePopupImage.addEventListener('click', () => closePopup(popupImage))

const validationConfig = {
  formSelector: '.popup__form',
  userFormName: 'change_user',
  placeFormName: 'place',
  inputSelector: '.popup__field',
  errorClass: 'text-input-error',
  inputInvalidClass: 'popup__field_invalid',
  buttonSelector: '.popup__button',
  buttonDesabledClass: 'popup__button_disabled'
};

enableValidation(validationConfig)
