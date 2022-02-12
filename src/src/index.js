import { $, $$ } from './utils/selector.js';
import { carPlayerTemplate, carForwardTemplate } from './utils/template.js';
import { getRandomNumber } from './utils/utils.js';

class RacingCar {
  constructor() {
    this.gameResult = new Map();
    this.winners = [];
    this.arrow = '⬇️️';
    this.$ = {
      carNameInput: $('#car-name-input'),
      carNameSubmit: $('#car-name-submit'),
      racingCountInput: $('#racing-count-input'),
      racingCountSubmit: $('#racing-count-submit'),
      racingCarElement: $('.racing-car-container'),
      gameRestartBtn: $('#game-restart-button'),
      winnerArea: $('#winner'),
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

  printGameProgress(racingCount) {
    const progressContainer = $$('.racing-car');

    for (let i = 0; i < racingCount; i++) {
      progressContainer.forEach((container) => {
        if (this.isValidNumber(getRandomNumber())) {
          container.insertAdjacentHTML(
            'beforeend',
            carForwardTemplate(this.arrow)
          );
        }
      });
    }

    this.clearInputValue(this.$.racingCountInput);
  }

  // racing result related functions

  updateRacingCounts() {
    this.printGameProgress(
      this.getRacingCountInputValue(this.$.racingCountInput)
    );

    const progressContainer = $$('.racing-car');

    for (let container of progressContainer) {
      container.dataset.racingCount = container.children.length - 1;

      this.gameResult.set(
        container.dataset.name,
        container.dataset.racingCount
      );
    }
  }

  decideWinners(gameResult) {
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

  printWinners() {
    this.decideWinners(this.gameResult);

    this.$.winnerArea.textContent = `🏆 최종 우승자: ${[...this.winners]} 🏆`;
  }

  bindEventHandlers() {
    this.$.carNameSubmit.addEventListener(
      'click',
      this.printCarNames.bind(this)
    );

    this.$.racingCountSubmit.addEventListener(
      'click',
      this.printWinners.bind(this)
    );
  }
}

new RacingCar();
