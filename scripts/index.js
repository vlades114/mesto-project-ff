const placesList = document.querySelector('.places__list');
const deleteCard = function () {
  const removingCard = this.closest('.card');
  removingCard.remove();
};

function cardCreate(cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const cardDescription = card.querySelector('.card__description');
  cardDescription.textContent = cardData.name;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return card;
}

initialCards.forEach((element) => {
  const newCard = cardCreate(element, deleteCard);
  placesList.append(newCard);
});
