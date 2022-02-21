import { ERROR_MESSAGE, VALIDATION } from './constants/constants.js';
import { $, $$ } from './utils/selector.js';
import { carPlayerTemplate, carForwardTemplate } from './utils/template.js';
import {
  getRandomNumber,
  ableChildNodes,
  disableChildNodes,
} from './utils/utils.js';

export default class RacingCar {
  constructor() {
    this.gameResult = new Map();
    this.winners = [];
    this.arrow = '⬇️️';
    this.$ = {
      app: $('#app'),
      carNameInput: $('#car-name-input'),
      carNameSubmit: $('#car-name-submit'),
      carNameForm: $('.car-name-form'),
      racingCountInput: $('#racing-count-input'),
      racingCountSubmit: $('#racing-count-submit'),
      racingCountForm: $('.racing-count-form'),
      racingCarElement: $('.racing-car-container'),
      gameRestartBtn: $('#game-restart-button'),
      winnerArea: $('#winner'),
    };

    this.initDisplay();
    this.bindEventHandlers();
  }

  // Commonly used functions

  clearInputValue(input) {
    input.value = '';
  }

  initDisplay() {
    const progressContainer = $$('.racing-car');

    progressContainer.forEach((element) => {
      element.parentNode.removeChild(element);
    });

    ableChildNodes(this.$.carNameForm);
    disableChildNodes(this.$.racingCountForm);

    this.winners = [];
    this.$.winnerArea.textContent = `🏆 최종 우승자: ${this.winners.join(
      ', '
    )} 🏆`;
  }

  // Car name related functions

  getCarNameInputValue(input) {
    const { value } = input;

    return value.split(',');
  }

  validateInput(inputValue) {
    let errorMessage;

    inputValue = inputValue.forEach((value) => {
      if (value.length > VALIDATION.CARNAME_LENGTH) {
        errorMessage = ERROR_MESSAGE.CAR_NAME.LENGTH_OVER_5;
      } else if (!value) {
        errorMessage = ERROR_MESSAGE.CAR_NAME.EMPTY;
      } else if (value.includes(VALIDATION.BLANK)) {
        errorMessage = ERROR_MESSAGE.CAR_NAME.INCLUDE_BLANK;
      } else {
        errorMessage;
      }
    });

    return errorMessage;
  }

  isValidInput(errorMessage) {
    let isValid = false;

    if (errorMessage) {
      isValid;
      alert(errorMessage);
    } else if (!errorMessage) {
      isValid = true;
    }

    return isValid;
  }

  printCarNames() {
    if (
      this.isValidInput(
        this.validateInput(this.getCarNameInputValue(this.$.carNameInput))
      )
    ) {
      const players = this.getCarNameInputValue(this.$.carNameInput);

      players.forEach((player) => {
        this.$.racingCarElement.insertAdjacentHTML(
          'beforeend',
          carPlayerTemplate(player)
        );
      });

      ableChildNodes(this.$.racingCountForm);
      disableChildNodes(this.$.carNameForm);
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

    if (randomNumber > VALIDATION.THRESHOLD_NUMBER) {
      isValid = true;
    } else {
      isValid;
    }

    return isValid;
  }

  printGameProgress(racingCount) {
    const progressContainer = $$('.racing-car');

    [...new Array(racingCount)].map(() => {
      progressContainer.forEach((container) => {
        if (this.isValidNumber(getRandomNumber())) {
          container.insertAdjacentHTML(
            'beforeend',
            carForwardTemplate(this.arrow)
          );
        }
      });
    });

    this.clearInputValue(this.$.racingCountInput);
  }

  // racing result related functions

  updateRacingCounts() {
    this.printGameProgress(
      this.getRacingCountInputValue(this.$.racingCountInput)
    );

    const progressContainer = $$('.racing-car');

    progressContainer.forEach((container) => {
      container.dataset.racingCount = container.children.length - 1;

      this.gameResult.set(
        container.dataset.name,
        container.dataset.racingCount
      );
    });
  }

  decideWinner(gameResult) {
    this.updateRacingCounts();

    const winners = [];

    const racingCount = [...gameResult.values()].map((num) => Number(num));
    const maxRacingCount = Math.max(...racingCount);

    for (let result of gameResult) {
      const players = result[0];
      const racingCount = result[1];

      if (Number(racingCount) === maxRacingCount) {
        winners.push(players);
      }
    }

    this.winners = winners;
  }

  printWinner() {
    this.decideWinner(this.gameResult);

    this.$.winnerArea.textContent = `🏆 최종 우승자: ${this.winners.join(
      ', '
    )} 🏆`;
  }

  bindEventHandlers() {
    this.$.app.addEventListener('click', (e) => {
      e.stopPropagation();

      if (e.target.id === 'car-name-submit') {
        this.printCarNames();
      }
      if (e.target.id === 'racing-count-submit') {
        this.printWinner();
      }
      if (e.target.id === 'game-restart-button') {
        this.initDisplay();
      }
    });
  }
}

new RacingCar();
