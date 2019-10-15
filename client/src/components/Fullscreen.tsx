import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

const StyledFullscreenDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default class Fullscreen extends Component<{}, {}> {
  render(): ReactNode {
    return <StyledFullscreenDiv>{this.props.children}</StyledFullscreenDiv>;
  }
}
