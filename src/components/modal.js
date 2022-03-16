import { renderCard, createCard } from './card'
import { disableButton } from './validate'

export const labelInput = document.querySelector('.field__label')
export const imageInput = document.querySelector('.field__image')
export const placeButton = document.querySelector('.popup__button_place')
export const userButton = document.querySelector('.popup__button_user')
export const nameInput = document.querySelector('.field__name')
export const jobInput = document.querySelector('.field__job')
export const title = document.querySelector('.profile__title')
export const subtitle = document.querySelector('.profile__subtitle')
export const popupUser = document.querySelector('.popup_user')
export const formPlace = document.querySelector('.form__place')
export const popupPlace = document.querySelector('.popup_place')

function submitFormPlaceHandler(config) {
  const newCard = createCard({
    name: labelInput.value,
    link: imageInput.value
  })

  renderCard(newCard, 'at_first')
  formPlace.reset()
  closePopup(popupPlace)
  disableButton(placeButton, config)
}

function submitFormUserHandler (config) {
  // достаю значения из инпутов формы
  const name = nameInput.value
  const job = jobInput.value

  title.textContent = name // задаю новое имя
  subtitle.textContent = job // задаю новую работу

  closePopup(popupUser) // вызываю функцию закрывающую popup
  disableButton(userButton, config)
}

function overlayHandler(event) {
  event.target.classList.remove('popup_opened')
}

function closeByEsape(event) {
  const key = event.key;
  if (key === "Escape" && activePopup) {
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

export { submitFormUserHandler, submitFormPlaceHandler, openPopup, closePopup }