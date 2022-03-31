import { Component } from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';

export class RacingCountInput extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <label for="racingCount">시도할 횟수를 입력해주세요.</label>
      <div class="racing-count-form d-flex">
          <input
            name="racingCount"
            type="number"
            id="racing-count-input"
            class="w-100 mr-2"
            placeholder="시도 횟수"
          />
          <button
            type="button"
            id="racing-count-submit"
            class="btn btn-cyan"
          >
            확인
          </button>
      </div>
     `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      const input = $('#racing-count-input');

      if (target.id !== 'racing-count-submit') return;

      this.updateRacingCount(input);
    });
  }

  updateRacingCount(input) {
    const { onSubmitRacingCount } = this.props;

    onSubmitRacingCount(Number(input.value));
  }
}
