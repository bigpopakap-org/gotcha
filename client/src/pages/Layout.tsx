import React, { Component } from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  width: 100%;
  height: 100%;

  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

export default class PageLayout extends Component<React.HTMLAttributes<HTMLDivElement>, {}> {
  render() {
    return <StyledPage className={this.props.className}>{this.props.children}</StyledPage>;
  }
}
