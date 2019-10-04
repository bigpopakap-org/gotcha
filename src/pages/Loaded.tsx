import React, {Component} from 'react';
import styled from 'styled-components';
import Centerer from "../components/Centerer";
import PageLayout from "./Layout";

const StyledPage = styled(PageLayout)`
  background: ${props => props.theme.colors.success};
`;

export default class LoadedPage extends Component {
  render() {
    return (
        <StyledPage>
          <Centerer horizontal vertical>
            Success!
          </Centerer>
        </StyledPage>
    )
  }
}
