import { ERROR_MESSAGE } from '../common/constants/constants.js';
import { $$ } from './DOM.js';
import { clearInputValue } from './utils.js';

export const isValidInputValue = (input) => {
  const carNames = input.value.split(',');

  if (!input.value) {
    return ERROR_MESSAGE.CAR_NAME.EMPTY;
  }

  return carNames
    .map((carName) => {
      if (carName.includes(' ')) {
        return ERROR_MESSAGE.CAR_NAME.INCLUDE_BLANK;
      }

      if (!carName) {
        return ERROR_MESSAGE.CAR_NAME.EMPTY;
      }

      if (carName.length >= 5) {
        return ERROR_MESSAGE.CAR_NAME.LENGTH_OVER_5;
      }
    })
    .join('');
};

export const isValidRacingCount = (input) => {
  if (input.value < 1 || input.value >= 100) {
    return ERROR_MESSAGE.RACING_COUNT.MIN_MAX;
  }
};

export const alertMessage = (errorMessage) => {
  if (errorMessage) {
    window.alert(errorMessage);

    clearInputValue($$('input'));

    return false;
  }

  return true;
};

export const isValidNumber = (randomNumber) => {
  if (randomNumber > 3) {
    return true;
  } else {
    return false;
  }
};
