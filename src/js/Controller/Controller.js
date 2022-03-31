import { $, $$ } from '../utils/DOM.js';
import { disableChildNodes, hideElements, showElement, ableChildNodes, delay } from '../utils/utils.js';
import { isValidInputValue, isValidRacingCount, alertMessage } from '../utils/validator.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.$ = {
      app: $('#app'),
    };

    this.bindEventListener();
  }

  getMaxRacingCount(target) {
    const progressContainers = [...target];
    const racingCountArr = [];

    progressContainers.map((container) => {
      racingCountArr.push(container.children.length - 1);
    });

    return Math.max(...racingCountArr);
  }

  decideRacingWinner(target) {
    const progressContainers = [...target];
    const maxRacingCount = this.getMaxRacingCount(target);
    const winnersArr = [];

    progressContainers.map((container) => {
      if (container.children.length - 1 === maxRacingCount) {
        winnersArr.push(container.dataset.name);
      }
    });

    this.model.updateRacingWinners(winnersArr);
  }

  async playEachGame() {
    for (let i = 0; i < this.model.state.racingCount; i++) {
      await delay(1000);

      this.model.state.gameCount += 1;

      this.view.printGameProgress($$('.car-player'));

      if (this.model.state.gameCount === this.model.state.racingCount) this.model.state.isGameOver = true;
    }
  }

  isGameOver() {}

  bindEventListener() {
    this.$.app.addEventListener('click', async ({ target }) => {
      if (target.tagName !== 'BUTTON') return;

      if (target.id === 'car-name-submit') {
        if (alertMessage(isValidInputValue($('#car-name-input')))) {
          this.model.updateCarNames($('#car-name-input').value.split(','));

          disableChildNodes($('.car-name-form'));

          this.view.printCarNames($('#game-process-section'), this.model.state.carNames);

          showElement($('#racing-count-section'), $('#game-process-section'));
        }
      }

      if (target.id === 'racing-count-submit') {
        if (alertMessage(isValidRacingCount($('#racing-count-input')))) {
          this.model.updateRacingCount($('#racing-count-input').value);

          disableChildNodes($('.racing-count-form'));

          this.view.printLoadingTemplate($$('.racing-car'));

          await this.playEachGame();

          this.view.hideSpinners($$('.spinner-container'));

          showElement($('#game-result-section'));

          this.decideRacingWinner($$('.racing-car'));

          this.view.printRacingWinners($('#game-result-text'), this.model.state.winners, this.model.state.isGameOver);
        }
      }

      if (target.id === 'game-restart-button') {
        this.model.initState();

        hideElements($('#racing-count-section'), $('#game-process-section'), $('#game-result-section'));

        ableChildNodes($('.car-name-form'), $('.racing-count-form'));

        $('.racing-car-container').innerHTML = '';
      }
    });
  }
}
