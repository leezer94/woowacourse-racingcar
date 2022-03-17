import { POSITION } from '../common/constants/constants.js';
import { progressTemplate, carNamesTemplate } from '../utils/template.js';
import { getRandomNumber } from '../utils/utils.js';
import { isValidNumber } from '../utils/validator.js';

export class View {
  constructor() {}

  printCarNames(target, carNames) {
    this.render(target, POSITION.AFTEREND, carNamesTemplate(carNames));
  }

  printGameProgress(target, racingCount) {
    const progressContainers = [...target];

    [...new Array(racingCount)].map(() => {
      progressContainers.map((container) => {
        if (isValidNumber(getRandomNumber())) {
          this.render(container, POSITION.BEFOREEND, progressTemplate());
        }
      });
    });
  }

  printRacingWinners(target, winners) {
    target.textContent = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;
  }

  render(target, position, template) {
    target.insertAdjacentHTML(position, template);
  }
}
