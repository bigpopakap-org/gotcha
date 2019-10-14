import { Component, ReactNode } from 'react';

interface Props {
  creatInitial: (onStartLoading: () => void) => ReactNode;
  loading: ReactNode;
  loaded: ReactNode;
}

interface State {
  state: 'initial' | 'loading' | 'loaded';
}

export default class Gotcha extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      state: 'initial',
    };

    this.startLoading = this.startLoading.bind(this);
    this.finishLoading = this.finishLoading.bind(this);

    window.addEventListener('beforeunload', this.finishLoading);
  }

  startLoading(): void {
    this.setState({
      state: 'loading',
    });
  }

  finishLoading(): void {
    if (this.state.state === 'loading') {
      this.setState({
        state: 'loaded',
      });
    }
  }

  render(): ReactNode {
    return (() => {
      switch (this.state.state) {
        case 'initial':
          return this.props.creatInitial(this.startLoading);
        case 'loading':
          return this.props.loading;
        case 'loaded':
          return this.props.loaded;
      }
    })();
  }
}
