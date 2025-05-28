/**
 * Создает карточку с событиями удаления и лайка.
 * @param {Object} cardData - Данные для карточки.
 * @param {Function} deleteCard - Колбэк функция удаления.
 * @param {Function} likeCard - Колбэк функция лайка карточки.
 * @param {Function} handleOpenCard - Колбэк функция открытия карточки.
 * @returns {HTMLElement} Созданная карточка.
 */
export const createCard = (
  cardData,
  { handleDeleteCard, handleLikeCard, handleOpenCard },
  cardOwnerId
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const isCardLiked = cardData.likes
    ? cardData.likes.some((like) => like._id === cardOwnerId)
    : false;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;

  if (cardData.owner._id !== cardOwnerId) {
    deleteButton.classList.add('card__delete-button_disabled');
  }

  if (isCardLiked) {
    likeCard(likeButton);
  }

  deleteButton.addEventListener('click', () =>
    handleDeleteCard(cardData._id, card)
  );
  likeButton.addEventListener('click', () =>
    handleLikeCard(likeButton, likeCounter, cardData._id)
  );
  cardImage.addEventListener('click', () =>
    handleOpenCard(cardData.link, cardData.alt, cardData.name)
  );

  return card;
};

/**
 * Устанавливает или снимает лайк с карточки.
 * @param {HTMLElement} button - Кнопка лайка.
 */
export const likeCard = (button) => {
  button.classList.toggle('card__like-button_is-active');
};

/**
 * Удаляет карточку.
 * @param {HTMLElement} curCard - Элемент карточки.
 */
export const removeCard = (curCard) => {
  curCard.remove();
};
