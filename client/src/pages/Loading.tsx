import React, {Component} from 'react';
import styled from 'styled-components';
import Centerer from "../components/Centerer";
import PageLayout from "./Layout";

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.error};
`;

export default class LoadingPage extends Component {
  render() {
    return (
        <StyledPage>
          <Centerer horizontal vertical>
            Loading...
          </Centerer>
        </StyledPage>
    )
  }
}
