import { ARROW } from '../../common/constants/constants.js';
import { Component } from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import { loadingTemplate } from '../../utils/template.js';
import { getRandomNumber } from '../../utils/utils.js';
import { isValidNumber } from '../../utils/validator.js';

export class GameProgress extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { carNames, racingCount } = this.props;

    return `
      <div class="d-flex justify-center mt-5">
        <section class="mt-4">
          <div class="racing-car-container d-flex">
          ${carNames
            .map((carName, i) => {
              return `
            <div class ="racing-car" data-name=${carName} data-racing-count = ${i}>
              <div class="car-player mr-2">${carName}</div>
              ${[...new Array(racingCount)]
                .map(() => {
                  if (racingCount) {
                    if (isValidNumber(getRandomNumber())) {
                      return `
                        <div class="d-flex justify-center mt-4">
                          <div class="relative spinner-container hidden">
                            <span class="material spinner"></span>
                          </div>
                        </div>`;
                    }
                  }
                })
                .join('')}
            </div>
            `;
            })
            .join('')}
          </div>
        </section>
      </div>
    `;
  }
}
