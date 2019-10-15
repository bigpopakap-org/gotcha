import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { GotchaResult } from '@gotcha/shared';

import Centerer from 'components/Centerer';
import PageLayout from 'pages/Layout';

interface Props {
  currentGotchaResult: GotchaResult;
}

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.success};
`;

export default class LoadedPage extends Component<Props, {}> {
  render(): ReactNode {
    return (
      <StyledPage>
        <Centerer horizontal vertical>
          {this.props.currentGotchaResult}
        </Centerer>
      </StyledPage>
    );
  }
}
