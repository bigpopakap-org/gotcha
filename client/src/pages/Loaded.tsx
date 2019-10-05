import React, { Component } from 'react';
import styled from 'styled-components';

import Centerer from 'components/Centerer';
import PageLayout from 'pages/Layout';
import { GotchaResult } from 'shared/shared';

interface Props {
  currentGotchaResult: GotchaResult;
}

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.success};
`;

export default class LoadedPage extends Component<Props, {}> {
  render() {
    return (
      <StyledPage>
        <Centerer horizontal vertical>
          {this.props.currentGotchaResult}
        </Centerer>
      </StyledPage>
    );
  }
}
