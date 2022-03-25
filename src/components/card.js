import {
  openPopup
} from './modal'
import {
  setlike,
  deleteLikeAPI,
  deleteCards,
  userID,
  patchAvatar,
} from './api'
const popupImage = document.querySelector('.popup_image');
const popupImageTitle = document.querySelector('.popup_image .popup__text');
const image = document.querySelector('.popup_image .popup__picture');
const templateLocation = document.getElementById('template__location')

const locationRow = document.querySelector('.locations__row')

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
  const likeCount = locationCard.querySelector('.location__like-count')

  if (item.likes.length !== 0) {
    item.likes.forEach(el => {
      if (userID === el._id) {
        like.classList.add('active')
      }
    });
  }

  likeCount.textContent = item.likes.length
  
  like.addEventListener('click', (evt) => {
    if (like.classList.contains('active')) {
      deleteLikeAPI(item._id).then((res) => {
        likeCount.textContent = res.likes.length;
        like.classList.remove('active')
      })
      .catch((error) => console.log(error))
    } else {
      setlike(item._id).then((res) => {
        likeCount.textContent = res.likes.length;
        like.classList.add('active')
      })
      .catch((error) => console.log(error))
    }
  })
  
  const locationDelete = locationCard.querySelector('.location__delete')
  if (item.owner._id === userID) {
    locationDelete.addEventListener('click', function (event) {
      deleteCards(item._id).then(() => {
        event.target.closest('.location').remove()
      })
      .catch((error) => console.log(error))
    })
  } else {
    locationDelete.remove()
  }

  return locationCard
}

export { renderCard, deleteCards, createCard, popupImage, }