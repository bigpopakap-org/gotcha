import React, { Component } from 'react';
import { Reset as ResetCSS } from 'styled-reset';
// TODO(#7) fix this import statement and remove this ignore
// eslint-disable-next-line import/named
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { GotchaResult, GOTCHA_RESULT_QUERY_PARAM_NAME, isGotchaResult } from '@gotcha/shared';

import InitialPage from 'pages/Initial';
import LoadingPage from 'pages/Loading';
import LoadedPage from 'pages/Loaded';
import Gotcha from 'components/Gotcha';
import Fullscreen from 'components/Fullscreen';
import DEFAULT_THEME from 'themes/default';
import DARK_THEME from 'themes/dark';
import DarkModeDetector, { DarkMode } from 'components/DarkModeDetector';

interface State {
  theme: DefaultTheme;
  currentGotchaResult: GotchaResult;
}

function getGotchaResult(): GotchaResult {
  const queryParams = new URLSearchParams(window.location.search);

  if (queryParams.has(GOTCHA_RESULT_QUERY_PARAM_NAME)) {
    const gotchaResultParam = queryParams.get(GOTCHA_RESULT_QUERY_PARAM_NAME);
    return isGotchaResult(gotchaResultParam) ? gotchaResultParam : 'lose';
  } else {
    return 'lose';
  }
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      theme: DEFAULT_THEME,
      currentGotchaResult: 'lose',
    };

    this.onDarkModeDetected = this.onDarkModeDetected.bind(this);
  }

  componentDidMount(): void {
    this.setState({
      currentGotchaResult: getGotchaResult(),
    });
  }

  onDarkModeDetected(darkMode: DarkMode) {
    this.setState({
      theme: darkMode === 'dark' ? DARK_THEME : DEFAULT_THEME,
    });
  }

  render() {
    const createInitialPage = (onStartLoading: () => void) => (
      <InitialPage onStartLoading={onStartLoading} />
    );
    const loadingPage = <LoadingPage currentGotchaResult={this.state.currentGotchaResult} />;
    const loadedPage = <LoadedPage currentGotchaResult={this.state.currentGotchaResult} />;

    return (
      <React.Fragment>
        <ResetCSS />
        <DarkModeDetector onDarkModeDetected={this.onDarkModeDetected} />

        <ThemeProvider theme={this.state.theme}>
          <Fullscreen>
            <Gotcha creatInitial={createInitialPage} loading={loadingPage} loaded={loadedPage} />
          </Fullscreen>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
