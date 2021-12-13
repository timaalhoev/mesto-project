const edit = document.querySelector('.profile__edit-button')
const plus = document.querySelector('.profile__button')
const title = document.querySelector('.profile__title')
const subtitle = document.querySelector('.profile__subtitle')
/* нахожу элементы попапа popup_user */
const popupUser = document.querySelector('.popup_user')
const formUser = document.querySelector('.form__user')
const nameInput = document.querySelector('.field__name')
const jobInput = document.querySelector('.field__job')
const closePopupUser = document.querySelector('.popup_user .popup__close')
/* нахожу элементы попапа popup_place */
const popupPlace = document.querySelector('.popup_place')
const formPlace = document.querySelector('.form__place')
const labelInput = document.querySelector('.field__label')
const imageInput = document.querySelector('.field__image')
const closePopupPlace = document.querySelector('.popup_place .popup__close')
/* нахожу элементы попапа popup_image */
const popupImage = document.querySelector('.popup_image')
const image = document.querySelector('.popup_image .popup__picture')
const closePopupImage = document.querySelector('.popup_image .popup__close')
const popupImageTitle = document.querySelector('.popup_image .popup__text')
/* нахожу template карточки места */
const templateLocation = document.getElementById('template__location')

/* открываем и закрываем попап "Редактировать юзера" */
edit.addEventListener('click', () => openPopup(popupUser))
closePopupUser.addEventListener('click', () => closePopup(popupUser))

/* открываем и закрываем попап "Новое место" */
plus.addEventListener('click', () => openPopup(popupPlace))
closePopupPlace.addEventListener('click', () => closePopup(popupPlace))

function openPopup(el) {
  el.classList.add('popup_opened')
}

function closePopup(el) {
  el.classList.remove('popup_opened')
}

// навешиваю обработчик события 'submit'
formUser.addEventListener('submit', submitFormUserHandler)

// описываю функцию-обработчик
function submitFormUserHandler (event) {
  event.preventDefault()

  // достаю значения из инпутов формы
  const name = nameInput.value
  const job = jobInput.value

  title.textContent = name // задаю новое имя
  subtitle.textContent = job // задаю новую работу

  closePopup(popupUser) // вызываю функцию закрывающую popup
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const locationRow = document.querySelector('.locations__row')

initialCards.forEach(item => {
  createCard(item)
})

formPlace.addEventListener('submit', submitFormPlaceHandler)

function submitFormPlaceHandler(event) {
  event.preventDefault()

  createCard({
    name: labelInput.value,
    link: imageInput.value
  })

  closePopup(popupPlace)
}

function createCard(item) {
  const location = templateLocation.content
  const locationCard = location.cloneNode(true)

  const locationImage = locationCard.querySelector('.location__images')
  locationImage.src = item.link
  locationImage.addEventListener('click', function () {
    openPopup(popupImage)

    closePopupImage.addEventListener('click', () => closePopup(popupImage))
    image.setAttribute('src', item.link)
    popupImageTitle.textContent = item.name
  })

  locationCard.querySelector('.location__title').textContent = item.name

  locationCard.querySelector('.location__like').addEventListener('click', function () {
    locationLike.classList.toggle('active')
  })

  const icon = locationCard.querySelector('.location__delete')
  icon.addEventListener('click', function () {
    icon.parentNode.remove()
  })

  locationRow.prepend(locationCard)
}