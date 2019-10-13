import React, { Component } from 'react';
import styled from 'styled-components';
import { GotchaResult } from '@gotcha/shared';

import Centerer from 'components/Centerer';
import PageLayout from 'pages/Layout';

interface Props {
  currentGotchaResult: GotchaResult;
}

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.error};
`;

export default class LoadingPage extends Component<Props, {}> {
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
