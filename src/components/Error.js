import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.span`
  display: block;
  margin: 0 auto;
  padding: var(--app_padding);
  max-width: var(--max_content_width);
  text-align: center;
`;

const Error = props => <ErrorWrapper>{props.message}</ErrorWrapper>;

export default Error;
