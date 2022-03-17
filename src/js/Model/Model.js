import { $$ } from '../utils/DOM.js';
import { clearInputValue } from '../utils/utils.js';

export class Model {
  constructor() {
    this.state = {
      carNames: [],
      racingCount: 0,
      winners: [],
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

  resetState() {
    this.setState({
      ...this.state,
      winners: [],
      racingCount: 0,
      carNames: [],
    });
  }
}
