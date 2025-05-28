//Валидация форм (шаблон и текст)
const namePattern = /^[a-zа-яё\-\s]+$/i;
const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
const textErrorMessage =
  'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';

// очистка ошибок валидации вызовом clearValidation
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    clearValidation(formElement, config);

    setEventListeners(formElement, config);
  });
};

// Функция для установки слушателей событий
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    if (checkTextInputs(inputElement)) {
      inputElement.setAttribute('data-error-message', textErrorMessage);
    }

    inputElement.addEventListener('input', function () {
      checkInputValidity(
        formElement,
        inputElement,
        config.inputErrorClass,
        config.errorClass
      );
      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    });
  });
};

// Очистка ошибок валидации и деактивация кнопки
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) =>
    hideInputError(
      formElement,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    )
  );

  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !isInputValid(inputElement);
  });
}

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!isInputValid(inputElement)) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const isInputValid = (inputElement) => {
  let isValid = inputElement.validity.valid;

  if (!checkByPattern(inputElement)) {
    isValid = false;
  }

  return isValid;
};

const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(
    `.popup__error_type_${inputElement.name}`
  );
  inputElement.classList.add(inputErrorClass);

  errorElement.textContent = inputElement.validationMessage;

  if (inputElement.validity.valid && !checkByPattern(inputElement)) {
    if (checkTextInputs(inputElement)) {
      errorElement.textContent = inputElement.dataset.errorMessage;
    }
  }
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(
    `.popup__error_type_${inputElement.name}`
  );
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkByPattern = (inputElement) => {
  if (checkTextInputs(inputElement)) {
    return namePattern.test(inputElement.value);
  }

  if (checkUrlInputs(inputElement)) {
    return urlPattern.test(inputElement.value);
  }

  return true;
};

const checkTextInputs = (inputElement) => {
  let ret = false;

  if (
    inputElement.name === 'name' ||
    inputElement.name === 'place-name' ||
    inputElement.name === 'description'
  ) {
    ret = true;
  }

  return ret;
};

const checkUrlInputs = (inputElement) => {
  let ret = false;

  if (inputElement.name === 'link') {
    ret = true;
  }

  return ret;
};
