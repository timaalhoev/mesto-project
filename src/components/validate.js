import { submitFormPlaceHandler, submitFormUserHandler } from "./modal";

const hideInputError = (inputElement, errorElement, config) => {
    inputElement.classList.remove(config.inputInvalidClass);
    inputElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
    inputElement.classList.add(config.inputInvalidClass);
    inputElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.buttonDesabledClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, config) => {
    buttonElement.classList.remove(config.buttonDesabledClass);
    buttonElement.disabled = false;
};
  
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
      hideInputError(inputElement, errorElement, config)
  } else {
      showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  }
};

const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);
  if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, config)
  } else {
      enableButton(buttonElement, config)
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config)
        toggleButtonState(formElement, inputList, config)
      });
  });
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(item => {
    item.addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.name === config.placeFormName) {
        submitFormPlaceHandler();
      } else if (event.target.name === config.userFormName) {
        submitFormUserHandler()
      }
    });
    setEventListeners(item, config)
  });
};


export { enableValidation }