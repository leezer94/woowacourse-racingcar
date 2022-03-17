import { $, $$ } from '../utils/DOM.js';
import { disableChildNodes, hideElement, showElement, ableChildNodes } from '../utils/utils.js';
import { isValidInputValue, alertMessage } from '../utils/validator.js';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.$ = {
      app: $('#app'),
    };
    this.bindEventListener();
  }

  decideRacingWinner() {
    const progressContainers = [...$$('.racing-car')];
    const racingCountArr = [];
    const winnersArr = [];

    let maxRacingCount;

    progressContainers.map((container) => {
      racingCountArr.push(container.children.length - 1);
    });

    maxRacingCount = Math.max(...racingCountArr);

    progressContainers.map((container) => {
      if (container.children.length - 1 === maxRacingCount) {
        winnersArr.push(container.dataset.name);
      }
    });

    this.model.updateRacingWinners(winnersArr);
  }

  bindEventListener() {
    this.$.app.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'BUTTON') return;

      if (target.id === 'car-name-submit') {
        if (alertMessage(isValidInputValue($('#car-name-input')))) {
          this.model.updateCarNames($('#car-name-input').value.split(','));

          disableChildNodes($('.car-name-form'));

          showElement($('#racing-count-section'), $('#game-process-section'));

          this.view.printCarNames($('#game-process-section'), this.model.state.carNames);
        }
      }

      if (target.id === 'racing-count-submit') {
        this.model.updateRacingCount($('#racing-count-input').value);

        disableChildNodes($('.racing-count-form'));

        this.view.printGameProgress($$('.racing-car'), this.model.state.racingCount);

        showElement($('#game-result-section'));

        if (this.model.state.racingCount) {
          this.decideRacingWinner();

          this.view.printRacingWinners($('#game-result-text'), this.model.state.winners);
        }
      }

      if (target.id === 'game-restart-button') {
        this.model.resetState();

        hideElement($('#racing-count-section'), $('#game-process-section'), $('#game-result-section'));

        ableChildNodes($('.car-name-form'), $('.racing-count-form'));

        $('#game-process-section').innerHTML = '';
      }
    });
  }
}
