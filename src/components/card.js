import {
  openPopup
} from './modal'

const popupImage = document.querySelector('.popup_image');
const popupImageTitle = document.querySelector('.popup_image .popup__text');
const image = document.querySelector('.popup_image .popup__picture');
const templateLocation = document.getElementById('template__location')

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
  renderCard(createCard(item))
})

function renderCard(element, queue) {
  if (queue === 'at_first')
    locationRow.prepend(element)
  else
    locationRow.append(element)
}

function createCard(item) {
  const location = templateLocation.content
  const locationCard = location.cloneNode(true)

  const locationImage = locationCard.querySelector('.location__images')
  locationImage.src = item.link
  locationImage.alt = item.name
  locationImage.addEventListener('click', function () {
    openPopup(popupImage)

    image.setAttribute('src', item.link)
    image.setAttribute('alt', item.name)
    popupImageTitle.textContent = item.name
  })

  locationCard.querySelector('.location__title').textContent = item.name

  const like = locationCard.querySelector('.location__like')
  
  like.addEventListener('click', function () {
    like.classList.toggle('active')
  })

  const icon = locationCard.querySelector('.location__delete')
  icon.addEventListener('click', function (event) {
    event.target.closest('.location').remove()
  })

  return locationCard
}

export { renderCard, createCard, popupImage }