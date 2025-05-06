import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleLikeCard, handleDeleteCard } from './card.js';
import {
  handleOpenPopup,
  handleClosePopup,
  handleEscKeyDown,
} from './modal.js';

// Основной контейнер страницы и список карточек
const page = document.querySelector('.page');
const placesList = document.querySelector('.places__list');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add-button');

//Модальны окна
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormDescription = editProfileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Форма создания новой карточки
const newCardForm = document.forms['new-place'];
const newCardFormName = newCardForm.elements['place-name'];
const editProfileFormLink = newCardForm.elements.link;

//функция открытия модального окна изображения карточки
function handleImageOpen(evt) {
  const image = evt.target;
  const curCard = evt.target.closest('.card');

  popupImage.querySelector('.popup__image').src = image.src;
  popupImage.querySelector('.popup__caption').textContent =
    curCard.querySelector('.card__title').textContent;

  handleOpenPopup(popupImage);
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
page.addEventListener('keydown', handleEscKeyDown);

profileEditButton.addEventListener('click', () => {
  handleOpenPopup(popupEditProfile);
  editProfileFormName.value = profileTitle.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
});

newCardAddButton.addEventListener('click', () => handleOpenPopup(popupNewCard));

editProfileForm.addEventListener('submit', handleEditForm);

newCardForm.addEventListener('submit', handleNewPlaceForm);

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => handleClosePopup(popup));
  }
});

//Обработчик отправки форм
function handleFormSubmit(evt, popup, callback) {
  evt.preventDefault();
  callback();
  handleClosePopup(popup);
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
      link: editProfileFormLink.value,
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
