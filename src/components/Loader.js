import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  width: 35px;
  height: 35px;
  top: 50%;
  left: 50%;
  z-index: 500;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: space-between;

  span {
    display: inline-block;
    width: 5px;
    height: 20px;
    background: #fff;

    &:nth-child(1) {
      animation: grow 1s ease-in-out infinite;
    }

    &:nth-child(2) {
      animation: grow 1s ease-in-out 0.15s infinite;
    }

    &:nth-child(3) {
      animation: grow 1s ease-in-out 0.3s infinite;
    }

    &:nth-child(4) {
      animation: grow 1s ease-in-out 0.45s infinite;
    }
  }
`;

const Loader = () => (
  <LoaderWrapper>
    <span />
    <span />
    <span />
    <span />
  </LoaderWrapper>
);

export default Loader;
