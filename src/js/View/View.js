import { POSITION } from '../common/constants/constants.js';
import { progressTemplate, carNamesTemplate, loadingTemplate } from '../utils/template.js';
import { delay, getRandomNumber } from '../utils/utils.js';
import { isValidNumber } from '../utils/validator.js';

export default class View {
  constructor() {}

  printCarNames(target, carNames) {
    this.render(target, POSITION.AFTEREND, carNamesTemplate(carNames));
  }

  printLoadingTemplate(target) {
    const progressContainers = [...target];

    progressContainers.map((container) => {
      this.render(container, POSITION.BEFOREEND, loadingTemplate());
    });
  }

  hideSpinners(targets) {
    [...targets].map((target) => (target.hidden = true));
  }

  async printGameProgress(target) {
    const carPlayers = [...target];

    carPlayers.map((container) => {
      const isOkToMoveForward = isValidNumber(getRandomNumber());

      if (isOkToMoveForward) {
        this.render(container, POSITION.AFTEREND, progressTemplate());
      }
    });
  }

  async printRacingWinners(target, winners, isGameOver) {
    if (isGameOver) {
      target.textContent = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;

      await delay(2000);

      window.alert(`축하합니다! 최종 우승자 : ${winners.join(', ')} 🏆 입니다. `);
    }
  }

  render(target, position, template) {
    target.insertAdjacentHTML(position, template);
  }
}
