//Конфиг подключения
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39/',
  headers: {
    authorization: '3e77b996-5a4b-4cbf-94e8-9001ccd7f1ef',
    'Content-Type': 'application/json',
  },
};

//Обработка ответа
const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение информации о пользователе с сервера
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    return responseCheck(res);
  });
}

// Загрузка карточек с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    return responseCheck(res);
  });
}

//Обновление информации о пользователе
export function updateUserInfo(newName, newAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    return responseCheck(res);
  });
}

//Обновление аватара пользователя
export function updateUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => {
    return responseCheck(res);
  });
}

//Добавление новой карточки
export function addCard(newCardTitle, newCardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardTitle,
      link: newCardLink,
    }),
  }).then((res) => {
    return responseCheck(res);
  });
}

// Удаление карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return responseCheck(res);
  });
}

//Поставить лайк
export function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {
    return responseCheck(res);
  });
}

//Убрать лайк
export function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return responseCheck(res);
  });
}
