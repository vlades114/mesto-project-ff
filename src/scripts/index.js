import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleLikeCard, handleDeleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';

// Список карточек
const placesList = document.querySelector('.places__list');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add-button');

//Модальны окна
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormDescription = editProfileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Форма создания новой карточки
const newCardForm = document.forms['new-place'];
const newCardFormName = newCardForm.elements['place-name'];
const newCardFormLink = newCardForm.elements.link;

/**
 * функция открытия модального окна изображения карточки.
 * @param {string} link - Ссылка на изображение.
 * @param {string} name - Название изображения.
 */
function handleImageOpen(link, name) {
  popupImage.querySelector('.popup__image').src = link;
  popupImage.querySelector('.popup__caption').textContent = name;

  openModal(popupImage);
}

//Код отображения карточек при открытии страницы
initialCards.forEach((element) => {
  const newCard = createCard(
    element,
    handleDeleteCard,
    handleLikeCard,
    handleImageOpen
  );
  placesList.append(newCard);
});

// Инициализация обработчиков событий
profileEditButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  editProfileFormName.value = profileTitle.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
});

newCardAddButton.addEventListener('click', () => openModal(popupNewCard));

editProfileForm.addEventListener('submit', handleEditForm);

newCardForm.addEventListener('submit', handleNewPlaceForm);

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
    profileTitle.textContent = editProfileFormName.value;
    profileDescription.textContent = editProfileFormDescription.value;
  });
}

//Фнкция-обработчик события создания новой карточки
function handleNewPlaceForm(evt) {
  handleFormSubmit(evt, popupNewCard, () => {
    const newCard = {
      name: newCardFormName.value,
      link: newCardFormLink.value,
    };
    const createdCard = createCard(
      newCard,
      handleDeleteCard,
      handleLikeCard,
      handleImageOpen
    );
    placesList.prepend(createdCard);
    newCardForm.reset();
  });
}
