export class Component {
  $target;
  props;
  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  async initialState() {
    this.render();
  }

  setState(newState, position) {
    this.state = newState;
    this.render(position);
    console.log('setState', this.state);
  }

  template() {
    return ``;
  }

  render(position) {
    if (!position) {
      this.$target.innerHTML = this.template();
    } else {
      this.$target.insertAdjacentHTML(position, this.template());
    }

    this.componentDidMount();
  }

  componentDidMount() {}
}
