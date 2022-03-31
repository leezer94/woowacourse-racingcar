import { Component } from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';

export class GameResult extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const winners = this.updateWinners();

    return `
      <section>
         <h2 id="winner">🏆 최종 우승자: ${winners ? winners.join(', ') : ''}🏆</h2>
         <div class="d-flex justify-center game-restart"></div>
      </section>
     `;
  }

  updateWinners() {
    const { racingCount } = this.props;

    if (!racingCount) return;

    const containers = [...$('.racing-car-container').children];
    const racingCountArr = [];
    const winnersArr = [];

    containers.map((container) => {
      racingCountArr.push(container.children.length - 1);
    });

    const maxRacingCount = Math.max(...racingCountArr);

    containers.map((container) => {
      if (container.children.length - 1 === maxRacingCount) {
        winnersArr.push(container.dataset.name);
      }
    });

    return winnersArr;
  }
}
