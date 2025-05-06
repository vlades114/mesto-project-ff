/**
 * Открывает модальное окно, добавляя класс 'popup_is-opened' и функцию-обработчик клика по оверлею.
 * @param {HTMLElement} curPopup - Текущее модальное окно.
 */
export const handleOpenPopup = (curPopup) => {
  curPopup.classList.add('popup_is-opened');
  curPopup.addEventListener('click', handleClickOverlayPopup);
  document.addEventListener('keydown', handleEscKeyDown);
};

/**
 * Закрывает открытое модальное окно, удаляя класс 'popup_is-opened' и функцию-обработчик клика по оверлею.
 * @param {HTMLElement} curPopup - Текущее модальное окно.
 */
export const handleClosePopup = (curPopup) => {
  curPopup.classList.remove('popup_is-opened');
  curPopup.removeEventListener('click', handleClickOverlayPopup);
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
      openedPopup.classList.remove('popup_is-opened');
    }
  }
};

/**
 * Закрывает открытое модальное окно при клике по оверлею.
 * @param {MouseEvent} evt - Событие клика мышью.
 */
export const handleClickOverlayPopup = (evt) => {
  if (evt.target.classList.contains('popup')) {
    handleClosePopup(evt.target);
  }
}