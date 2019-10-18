import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import Fullscreen from 'components/Fullscreen';
import GlobalHeader from 'components/GlobalHeader';

const StyledPage = styled(Fullscreen)`
  display: flex;
  flex-direction: column;

  background: ${props => props.theme.colors.background};

  color: ${props => props.theme.colors.text};
`;

const StyledPageHeader = styled.div`
  width: 100%;
  height: 60px;
  flex: 0 0 60px;
`;

const StyledPageContent = styled.div`
  width: 100%;
  flex: 1 1 auto;
`;

export default class DefaultLayout extends Component<React.HTMLAttributes<HTMLDivElement>, {}> {
  render(): ReactNode {
    return (
      <StyledPage>
        <StyledPageHeader>
          <GlobalHeader />
        </StyledPageHeader>

        <StyledPageContent>{this.props.children}</StyledPageContent>
      </StyledPage>
    );
  }
}
