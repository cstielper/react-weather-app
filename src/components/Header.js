import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  background: var(--color_brand_1);

  button {
    width: 30px;
    height: 30px;
    margin-left: auto;
    background: url('imgs/gear.svg') no-repeat center center;
    border: 0;
    transition: opacity 0.25s;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      opacity: 0.25;

      &:hover {
        cursor: inherit;
      }
    }
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderWrapper className="masthead">
        <button
          disabled={!this.props.hasSettings}
          onClick={this.props.togglePanes}
        >
          <span className="assistive-text">Settings</span>
        </button>
      </HeaderWrapper>
    );
  }
}

export default Header;
