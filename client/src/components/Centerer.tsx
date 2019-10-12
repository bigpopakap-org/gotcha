import React, { Component } from 'react';
import styled from 'styled-components';

interface Props {
  horizontal?: boolean;
  vertical?: boolean;
}

const StyledHorizontalAndVerticalCenterer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

const StyledHorizontalCenterer = styled.div`
  display: flex;

  width: 100%;

  align-items: center;
  justify-content: center;
`;

const StyledVerticalCenterer = styled.div`
  display: flex;

  height: 100%;

  flex-direction: column;
  justify-content: center;
`;

export default class Centerer extends Component<Props, {}> {
  render() {
    if (this.props.horizontal && this.props.vertical) {
      return (
        <StyledHorizontalAndVerticalCenterer>
          <div>{this.props.children}</div>
        </StyledHorizontalAndVerticalCenterer>
      );
    } else if (this.props.horizontal) {
      return (
        <StyledHorizontalCenterer>
          <div>{this.props.children}</div>
        </StyledHorizontalCenterer>
      );
    } else if (this.props.children) {
      return (
        <StyledVerticalCenterer>
          <div>{this.props.children}</div>
        </StyledVerticalCenterer>
      );
    } else {
      return this.props.children;
    }
  }
}
