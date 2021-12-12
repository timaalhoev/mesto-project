const edit = document.querySelector('.profile__edit-button')
const plus = document.querySelector('.profile__button')
const popupUser = document.querySelector('.popup_user')
const popupPlace = document.querySelector('.popup_place')
const popupImage = document.querySelector('.popup_image')
const closePopupUser = document.querySelector('.popup_user .popup__close')
const closePopupPlace = document.querySelector('.popup_place .popup__close')

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

/* нахожу элементы формы */
const formUser = document.querySelector('.form__user')
const nameInput = document.querySelector('.field__name')
const jobInput = document.querySelector('.field__job')
const title = document.querySelector('.profile__title')
const subtitle = document.querySelector('.profile__subtitle')

// навешиваю обработчик события 'submit'
formUser.addEventListener('submit', formUserSubmitHandler)

// описываю функцию-обработчик
function formUserSubmitHandler (event) {
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
    const location = document.createElement('div')
    location.classList.add('location')

    const locationBlock = document.createElement('div')
    locationBlock.classList.add('location__block')

    const location__title = document.createElement('h2')
    location__title.classList.add('location__title')
    location__title.textContent = item.name

    const locationLike = document.createElement('button')
    locationLike.classList.add('location__like')

    locationLike.addEventListener('click', function () {
        locationLike.classList.toggle('active')
    })

    let icon = document.createElement('img')
    icon.setAttribute('src', './images/delite.svg')
    icon.classList.add('location__delete')

    icon.addEventListener('click', function () {
        icon.parentNode.remove()
    })

    const locationImage = document.createElement('img')
    locationImage.classList.add('location__images')
    locationImage.setAttribute('src', item.link)

    locationImage.addEventListener('click', function () {
      popupImage.innerHTML = ''
      popupImage.classList.add('popup_opened')

      const buttonClose = document.createElement('button')
      buttonClose.classList.add('popup__close')
      buttonClose.addEventListener('click', () => closePopup(popupImage))

      const image = document.createElement('img')
      image.classList.add('popup__picture')
      image.setAttribute('src', item.link)

      const text = document.createElement('p')
      text.classList.add('popup__text')
      text.textContent = item.name

      const container = document.createElement('div')
      container.classList.add('popup__container')
      container.classList.add('popup_big')

      container.appendChild(buttonClose)
      container.appendChild(image)
      container.appendChild(text)

      popupImage.appendChild(container)
    })

    locationBlock.appendChild(location__title)
    locationBlock.appendChild(locationLike)


    location.appendChild(locationImage)
    location.appendChild(locationBlock)
    location.appendChild(icon)

    locationRow.appendChild(location)
})

const labelInput = document.querySelector('.field__label')
const imageInput = document.querySelector('.field__image')
const formPlace = document.querySelector('.form__place')

formPlace.addEventListener('submit', formPlaceSubmitHandler)

function formPlaceSubmitHandler(event) {
    event.preventDefault()

    const assign = labelInput.value
    const link  = imageInput.value

    const location = document.createElement('div')
    location.classList.add('location')
    const locationBlock = document.createElement('div')
    locationBlock.classList.add('location__block')

    const locationTitle = document.createElement('h3')
    locationTitle.classList.add('location__title')
    locationTitle.textContent = assign

    const locationLike = document.createElement('button')
    locationLike.classList.add('location__like')

    locationBlock.appendChild(locationTitle)
    locationBlock.appendChild(locationLike)

    const locationDelete = document.createElement('img')
    locationDelete.setAttribute('src', './images/delite.svg')
    locationDelete.classList.add('location__delete')

    const locationImage = document.createElement('img')
    locationImage.classList.add('location__images')
    locationImage.setAttribute('src', link)


    location.appendChild(locationImage)
    location.appendChild(locationBlock)
    location.appendChild(locationDelete)

    locationRow.prepend(location)

    closePopup(popupPlace)
}