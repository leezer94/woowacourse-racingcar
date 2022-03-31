import { ARROW } from '../common/constants/constants.js';

export const loadingTemplate = () => {
  return `<div class="d-flex justify-center mt-4">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>`;
};

export const progressTemplate = () => {
  return `<div class="forward-icon mt-2">${ARROW}</div>`;
};

export const carNamesTemplate = (carNames) => {
  return `
      <div class="d-flex justify-center mt-5">
        <section class="mt-4">
          <div class="racing-car-container d-flex">
          ${carNames
            .map((carName, i) => {
              return `
            <div class ="racing-car" data-name=${carName} data-racing-count = ${i}>
                <div class="car-player mr-2">${carName}</div>
            </div>
            `;
            })
            .join('')}
          </div>
        </section>
      </div>
    `;
};
