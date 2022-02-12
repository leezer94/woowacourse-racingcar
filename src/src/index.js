import { $, $$ } from './utils/selector.js';
import { carPlayerTemplate, carForwardTemplate } from './utils/template.js';
import { getRandomNumber } from './utils/utils.js';

class RacingCar {
  constructor() {
    this.$ = {
      carNameInput: $('#car-name-input'),
      carNameSubmit: $('#car-name-submit'),
      racingCountInput: $('#racing-count-input'),
      racingCountSubmit: $('#racing-count-submit'),
      racingCarElement: $('.racing-car-container'),
    };

    this.bindEventHandlers();
  }

  // Commonly used functions

  clearInputValue(input) {
    input.value = '';
  }

  // Car name related functions

  getCarNameInputValue(input) {
    const { value } = input;

    return value.split(',');
  }

  isValidInput(inputValue) {
    let isValid = true;

    inputValue = inputValue.forEach((value) => {
      if (value.length > 5) {
        isValid = false;
        alert('5 자 이하의 자동차 이름을 입력해 주십시요.');
      } else if (!value) {
        isValid = false;
        alert('자동차 이름을 입력해 주십시오.');
      } else if (value.includes(' ')) {
        isValid = false;
        alert('자동차 이름은 공백을 포함해서는 안됩니다.');
      }
    });

    return isValid;
  }

  printCarNames() {
    if (this.isValidInput(this.getCarNameInputValue(this.$.carNameInput))) {
      const players = this.getCarNameInputValue(this.$.carNameInput);

      for (let player of players) {
        this.$.racingCarElement.insertAdjacentHTML(
          'beforeend',
          carPlayerTemplate(player)
        );
      }
    }

    this.clearInputValue(this.$.carNameInput);
  }

  // Racing count related functions

  getRacingCountInputValue(input) {
    const { value } = input;

    return Number(value);
  }

  isValidNumber(randomNumber) {
    let isValid = false;

    if (randomNumber > 3) {
      isValid = true;
    } else {
      isValid;
    }

    return isValid;
  }

  bindEventHandlers() {
    this.$.carNameSubmit.addEventListener(
      'click',
      this.printCarNames.bind(this)
    );
  }
}

new RacingCar();
