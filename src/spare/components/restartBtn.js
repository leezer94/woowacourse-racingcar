import { Component } from '../core/Component.js';

export class GameRestart extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <button id="game-restart-button" type="button" class="btn btn-cyan">
          다시 시작하기
      </button>
     `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id !== 'game-restart-button') return;

      this.restartGame(this.props);
    });
  }

  restartGame(state) {
    const { restartGame } = state;

    restartGame();
  }
}
