import { Component } from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';

export class CarNameInput extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
          <div class="car-name-form d-flex">
            <input
              type="text"
              id="car-name-input"
              class="w-100 mr-2"
              placeholder="자동차 이름"
            />
            <button type="button" id="car-name-submit" class="btn btn-cyan">
              확인
            </button>
          </div>
         `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id !== 'car-name-submit') return;

      const input = $('#car-name-input');

      this.onSubmitCarNames(this.props, input);
    });
  }

  onSubmitCarNames(state, input) {
    const { onSubmitCarNames } = state;

    onSubmitCarNames(input.value), (input.value = '');
  }
}
