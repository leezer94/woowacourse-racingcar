import { GameResult } from './components/main/GameResult.js';
import { CarNameInput } from './components/Input/CarNameInput.js';
import { RacingCountInput } from './components/Input/RacingCountInput.js';
import { Component } from './core/Component.js';
import { $ } from './utils/DOM.js';
import { GameRestart } from './components/restartBtn.js';
import { GameProgress } from './components/main/GameProgress.js';

export class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({
      carNames: [],
      racingCount: 0,
      winners: [],
    });
  }

  template() {
    return ` 
    <div class="header form d-flex justify-center mt-5">
      <div>
        <section>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
          </p>
        </section>
        <section class="car-name-section"></section>
        <section class="racing-count-section mt-5 "></section>
      </div> 
    </div>
    <div class="game-progress-container d-flex justify-center mt-5"></div>
    <div class="game-result-container d-flex justify-center mt-5"></div>
   `;
  }

  componentDidMount() {
    const { handleCarNamesInput, handleRacingCount, handleGameRestartBtn, handleGameResult } = this;

    new CarNameInput($('.car-name-section'), {
      onSubmitCarNames: handleCarNamesInput.bind(this),
    });

    new RacingCountInput($('.racing-count-section'), {
      onSubmitRacingCount: handleRacingCount.bind(this),
    });

    new GameProgress($('.game-progress-container'), { ...this.state, updateWinner: handleGameResult.bind(this) });

    new GameResult($('.game-result-container'), {
      ...this.state,
    });

    new GameRestart($('.game-restart'), {
      restartGame: handleGameRestartBtn.bind(this),
    });
  }

  handleCarNamesInput(inputValue) {
    this.setState({
      ...this.state,
      carNames: inputValue.split(','),
    });
  }

  handleRacingCount(inputValue) {
    this.setState({
      ...this.state,
      racingCount: inputValue,
    });
  }

  handleGameResult(winner) {
    this.setState({
      ...this.state,
      winners: winner,
    });
  }

  handleGameRestartBtn() {
    this.setState({
      ...this.state,
      carNames: [],
      racingCount: 0,
      winners: [],
    });
  }
}
