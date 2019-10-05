import React, {Component} from 'react';
import styled from 'styled-components';
import Centerer from "../components/Centerer";
import PageLayout from "./Layout";
import {GOTCHA_RESULT_QUERY_PARAM_NAME, GotchaResult, isGotchaResult} from "../shared";

interface State {
  gotchaResult: GotchaResult;
}

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.success};
`;

function getGotchaResult() : GotchaResult {
  const queryParams = new URLSearchParams(window.location.search);

  if (queryParams.has(GOTCHA_RESULT_QUERY_PARAM_NAME)) {
    const gotchaResultParam = queryParams.get(GOTCHA_RESULT_QUERY_PARAM_NAME);
    return isGotchaResult(gotchaResultParam) ? gotchaResultParam : 'lose';
  } else {
    return 'lose';
  }
}

export default class LoadedPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      gotchaResult: getGotchaResult()
    };
  }

  render() {
    return (
        <StyledPage>
          <Centerer horizontal vertical>
            {this.state.gotchaResult}
          </Centerer>
        </StyledPage>
    )
  }
}
