import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  background: var(--color_brand_1);
  font-size: 0.625em;
  text-align: center;

  img {
    height: 25px;
    margin: -0.5rem 0 0 0.25rem;
  }

  a {
    display: table;
    margin: 0 auto;
    color: #fff;
    text-decoration: none;

    span {
      display: inline-block;
    }
  }
`;

const Footer = () => (
  <FooterWrapper className="colophon">
    <a href="https://www.wunderground.com/">
      <span>Powered by Weather Underground</span>{' '}
      <img
        src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c_rev_horz.png"
        alt="Weather Underground"
      />
    </a>
  </FooterWrapper>
);

export default Footer;
