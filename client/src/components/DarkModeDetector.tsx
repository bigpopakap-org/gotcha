import React, {Component} from 'react';

export type DarkMode = 'dark' | 'light';

interface Props {
  onDarkModeDetected: (darkMode: DarkMode) => void
}

class DarkModeDetector extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onColorSchemeChanged = this.onColorSchemeChanged.bind(this);
  }

  componentDidMount(): void {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('darkMode') && (queryParams.get('darkMode') === 'true' || queryParams.get('darkMode') === 'false')) {
      // Let the query param override the theme requested by the browser
      this.props.onDarkModeDetected(queryParams.get('darkMode') === 'true' ? 'dark' : 'light');
    } else {
      // Detect changes to the requested color scheme
      window.matchMedia("(prefers-color-scheme: dark)").addListener(this.onColorSchemeChanged);
      window.matchMedia("(prefers-color-scheme: light)").addListener(this.onColorSchemeChanged);

      // Calculate the current color scheme
      this.onColorSchemeChanged();
    }
  }

  // TODO we should remove the listeners
  // componentWillUnmount(): void {
  //   window.matchMedia("(prefers-color-scheme: dark)").removeEventListener(this.onColorSchemeChanged);
  //   window.matchMedia("(prefers-color-scheme: light)").removeEventListener(this.onColorSchemeChanged);
  // }

  onColorSchemeChanged() {
    // Check what mode is active right now
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (isDarkMode) {
      this.props.onDarkModeDetected('dark');
    } else if (isLightMode) {
      this.props.onDarkModeDetected('light');
    } else {
      // Otherwise, it is unspecified or the browser doesn't support this
      // Default to dark mode at night
      const hour = new Date().getHours();
      const isNight = hour < 4 || hour >= 16;
      this.props.onDarkModeDetected(isNight ? 'dark' : 'light');
    }
  }

  render() {
    return React.Fragment;
  }
}

export default DarkModeDetector;
