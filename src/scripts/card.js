/**
 * Создает карточку с событиями удаления и лайка.
 * @param {Object} cardData - Данные для карточки.
 * @param {Function} handleDeleteCard - Колбэк функция удаления.
 * @param {Function} handleLikeCard - олбэк функция  лайка карточки.
 * @returns {HTMLElement} Созданная карточка.
 */
export const createCard = (
  cardData,
  handleDeleteCard,
  handleLikeCard,
  handleOpenCard
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', handleLikeCard);
  cardImage.addEventListener('click', handleOpenCard);

  return card;
};

/**
 * Устанавливает или снимает лайк с карточки
 * @param {Event} evt - click событие.
 */
export const handleLikeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

/**
 * Удаляет карточку.
 * @param {Event} evt - click событие.
 */
export const handleDeleteCard = (evt) => {
  evt.target.closest('.card').remove();
};
