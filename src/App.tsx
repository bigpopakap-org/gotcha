import React, {Component} from 'react';
import InitialPage from "./pages/Initial";
import LoadingPage from "./pages/Loading";
import LoadedPage from "./pages/Loaded";
import Gotcha from "./components/Gotcha";
import Fullscreen from "./components/Fullscreen";
import {Reset as ResetCSS} from 'styled-reset'
import {DefaultTheme, ThemeProvider} from "styled-components";
import DEFAULT_THEME from './themes/default';
import DARK_THEME from './themes/dark';
import DarkModeDetector, {DarkMode} from "./components/DarkModeDetector";

interface State {
  theme: DefaultTheme;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      theme: DEFAULT_THEME
    };

    this.onDarkModeDetected = this.onDarkModeDetected.bind(this);
  }

  onDarkModeDetected(darkMode: DarkMode) {
    this.setState({
      theme: darkMode === 'dark' ? DARK_THEME : DEFAULT_THEME
    });
  }

  render() {
    const createInitialPage = (onStartLoading: () => void) => (
        <InitialPage onStartLoading={onStartLoading}/>
    );
    const loadingPage = (<LoadingPage/>);
    const loadedPage = (<LoadedPage/>);

    return (
        <React.Fragment>
          <ResetCSS/>
          <DarkModeDetector onDarkModeDetected={this.onDarkModeDetected}/>

          <ThemeProvider theme={this.state.theme}>
            <Fullscreen>
              <Gotcha creatInitial={createInitialPage}
                      loading={loadingPage}
                      loaded={loadedPage}
              />
            </Fullscreen>
          </ThemeProvider>
        </React.Fragment>
    );
  }
}

export default App;
