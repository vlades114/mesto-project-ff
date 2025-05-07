/**
 * Открывает модальное окно, добавляя класс 'popup_is-opened' и функцию-обработчик клика по оверлею.
 * @param {HTMLElement} curPopup - Текущее модальное окно.
 */
export const openModal = (curPopup) => {
  curPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyDown);
};

/**
 * Закрывает открытое модальное окно, удаляя класс 'popup_is-opened' и функцию-обработчик клика по оверлею.
 * @param {HTMLElement} curPopup - Текущее модальное окно.
 */
export const closeModal = (curPopup) => {
  curPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyDown);
};

/**
 * Закрывает открытое модальное окно при нажатии клавиши 'Escape'.
 * @param {KeyboardEvent} evt - Событие нажатия клавиши клавиатуры.
 */
export const handleEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};
