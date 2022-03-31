import { $$ } from '../utils/DOM.js';
import { clearInputValue } from '../utils/utils.js';

export default class Model {
  constructor() {
    this.state = {
      carNames: [],
      racingCount: 0,
      gameCount: 0,
      winners: [],
      isGameOver: false,
    };
  }

  setState(newState) {
    this.state = newState;

    clearInputValue($$('input'));

    console.log('state', this.state);
  }

  updateCarNames(inputValue) {
    this.setState({
      ...this.state,
      carNames: this.state.carNames.concat(inputValue),
    });
  }

  updateRacingCount(inputValue) {
    this.setState({
      ...this.state,
      racingCount: Number(inputValue),
    });
  }

  updateRacingWinners(winner) {
    this.setState({
      ...this.state,
      winners: winner,
    });
  }

  initState() {
    this.setState({
      ...this.state,
      carNames: [],
      racingCount: 0,
      gameCount: 0,
      winners: [],
      isGameOver: false,
    });
  }
}
