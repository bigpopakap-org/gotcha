import React, { Component, ReactNode } from 'react';
import { Reset as ResetCSS } from 'styled-reset';
// TODO(#7) fix this import statement and remove this ignore
// eslint-disable-next-line import/named
import { DefaultTheme, ThemeProvider } from 'styled-components';

import LandingPage from 'pages/LandingPage';
import DEFAULT_THEME from 'themes/default';

interface State {
  theme: DefaultTheme;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      theme: DEFAULT_THEME,
    };
  }

  render(): ReactNode {
    return (
      <React.Fragment>
        <ResetCSS />

        <ThemeProvider theme={this.state.theme}>
          <LandingPage />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
