import '../pages/index.css';
import { createCard, likeCard, removeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addCard,
  deleteCard,
  putLike,
  removeLike,
} from './api.js';

// Список карточек
const placesList = document.querySelector('.places__list');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add-button');
const imageOverlay = document.querySelector('.profile__image-overlay');

//Модальны окна
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');

//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormDescription = editProfileForm.elements.description;

//Форма создания новой карточки
const newCardForm = document.forms['new-place'];
const newCardFormName = newCardForm.elements['place-name'];
const newCardFormLink = newCardForm.elements.link;

//Форма удаления карточки
const deleteCardForm = document.forms['delete-card'];

//Форма обновления аватара
const updateUserAvatarForm = document.forms['update-avatar'];

//Профиль на главной странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

//Конфиг для модального окна
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//Процесс сохранения изменений
const saving = 'Сохранение...';

//Подключение валидации для модальных окон
enableValidation(config);

//Инициализация информации о юзере и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then((results) => {
    const userData = results[0];
    const cardList = results[1];
    if (userData) {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    }
    if (cardList.length > 0) {
      cardList.forEach((element) => {
        const newCard = createCard(
          element,
          {
            handleDeleteCard,
            handleLikeCard,
            handleOpenCard,
          },
          userData._id
        );
        placesList.append(newCard);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * функция открытия модального окна изображения карточки.
 * @param {string} link - Ссылка на изображение.
 * @param {string} name - Название изображения.
 */
function handleOpenCard(link, alt, name) {
  popupImageSrc.src = link;
  popupImageSrc.alt = alt;
  popupImageCaption.textContent = name;

  openModal(popupImage);
}

let cardForDelete = {};
function handleDeleteCard(cardId, curCard) {
  cardForDelete = {
    id: cardId,
    cardElement: curCard,
  };
  openModal(popupDeleteCard);
}

function handleLikeCard(likeButton, likeCounter, cardId) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardId)
      .then(
        (refrshedCardData) =>
          (likeCounter.textContent = refrshedCardData.likes
            ? refrshedCardData.likes.length
            : 0)
      )
      .catch((err) => {
        console.log(err);
      });
    likeCard(likeButton);
  } else {
    removeLike(cardId)
      .then(
        (refrshedCardData) =>
          (likeCounter.textContent = refrshedCardData.likes
            ? refrshedCardData.likes.length
            : 0)
      )
      .catch((err) => {
        console.log(err);
      });
    likeCard(likeButton);
  }
}

// Инициализация обработчиков событий
profileEditButton.addEventListener('click', () => {
  editProfileFormName.value = profileTitle.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
  clearValidation(popupEditProfile, config);
  openModal(popupEditProfile);
});

newCardAddButton.addEventListener('click', () => {
  clearValidation(popupNewCard, config);
  openModal(popupNewCard);
  newCardForm.reset();
});

imageOverlay.addEventListener('click', () => {
  clearValidation(popupUpdateAvatar, config);
  openModal(popupUpdateAvatar);
  updateUserAvatarForm.reset();
});

editProfileForm.addEventListener('submit', handleEditForm);

newCardForm.addEventListener('submit', handleNewPlaceForm);

deleteCardForm.addEventListener('submit', handleDeleteCardForm);

updateUserAvatarForm.addEventListener('submit', handleUpdateAvatarForm);

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(popup));
  }

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

//Обработчик отправки форм
function handleFormSubmit(evt, popup, callback) {
  evt.preventDefault();
  callback();
  closeModal(popup);
}

//Фнкция-обработчик события открытия модального окна для редактирования профиля
function handleEditForm(evt) {
  handleFormSubmit(evt, popupEditProfile, () => {
    const formButton = editProfileForm.querySelector(
      config.submitButtonSelector
    );
    const buttonOrigText = formButton.textContent;
    formButton.textContent = saving;
    updateUserInfo(editProfileFormName.value, editProfileFormDescription.value)
      .then((updatedUserInfo) => {
        profileTitle.textContent = updatedUserInfo.name;
        profileDescription.textContent = updatedUserInfo.about;
      })
      .finally(() => {
        formButton.textContent = buttonOrigText;
      });
  });
}

//Фнкция-обработчик события создания новой карточки
function handleNewPlaceForm(evt) {
  handleFormSubmit(evt, popupNewCard, () => {
    const formButton = newCardForm.querySelector(config.submitButtonSelector);
    const buttonOrigText = formButton.textContent;
    formButton.textContent = saving;
    const newCard = {
      name: newCardFormName.value,
      link: newCardFormLink.value,
    };
    addCard(newCard.name, newCard.link)
      .then((newCardFromServer) => {
        const createdCard = createCard(
          newCardFromServer,
          {
            handleDeleteCard,
            handleLikeCard,
            handleOpenCard,
          },
          newCardFromServer.owner._id
        );
        placesList.prepend(createdCard);
        newCardForm.reset();
      })
      .finally(() => {
        formButton.textContent = buttonOrigText;
      });
  });
}

//Фнкция-обработчик события удаления карточки
function handleDeleteCardForm(evt) {
  if (!cardForDelete.cardElement) return;
  handleFormSubmit(evt, popupDeleteCard, () => {
    deleteCard(cardForDelete.id)
      .then(() => {
        removeCard(cardForDelete.cardElement);
        cardForDelete = {};
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

//Фнкция-обработчик события обновления аватара
function handleUpdateAvatarForm(evt) {
  handleFormSubmit(evt, popupUpdateAvatar, () => {
    const avatarUrl = updateUserAvatarForm.elements.link.value;
    const formButton = updateUserAvatarForm.querySelector(
      config.submitButtonSelector
    );
    const buttonOrigText = formButton.textContent;
    formButton.textContent = saving;
    fetch(avatarUrl, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`${res.status}`);
        }
        const contentType = res.headers.get('Content-Type');
        if (!contentType || !contentType.startsWith('image/')) {
          return Promise.reject('ссылка не является изображением');
        }
        return updateUserAvatar(avatarUrl);
      })
      .then(() => {
        profileAvatar.style.backgroundImage = `url('${avatarUrl}')`;
        closeModal(popupUpdateAvatar);
        updateUserAvatarForm.reset();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        formButton.textContent = buttonOrigText;
      });
  });
}
