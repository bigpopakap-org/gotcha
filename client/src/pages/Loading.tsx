import React, { Component } from 'react';
import styled from 'styled-components';

import Centerer from 'components/Centerer';
import PageLayout from 'pages/Layout';
import { GOTCHA_RESULT_QUERY_PARAM_NAME, GotchaResult } from 'shared/shared';

interface Props {
  currentGotchaResult: GotchaResult;
}

function advanceGotchaResult(currentGotchaResult: GotchaResult): void {
  const queryParams = new URLSearchParams(window.location.search);

  // Calculate the next gotchaResult to set
  const nextGotchaResult = (() => {
    switch (currentGotchaResult) {
      case 'lose':
        return 'extra-try';
      case 'extra-try':
        return 'gotcha-win';
      case 'gotcha-win':
        return 'share';
      case 'share':
        return 'share';
      default:
        return 'lose';
    }
  })();

  // Set the next gotchaResult in the query params
  queryParams.set(GOTCHA_RESULT_QUERY_PARAM_NAME, nextGotchaResult);
  window.history.replaceState({}, document.title, `?${queryParams.toString()}`);
}

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.error};
`;

export default class LoadingPage extends Component<Props, {}> {
  componentDidMount(): void {
    advanceGotchaResult(this.props.currentGotchaResult);
  }

  render() {
    return (
      <StyledPage>
        <Centerer horizontal vertical>
          Loading...
        </Centerer>
      </StyledPage>
    );
  }
}
