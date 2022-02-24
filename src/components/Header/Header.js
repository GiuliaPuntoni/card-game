import styled, {css}  from 'styled-components';
import React from 'react';

import logo from '../../Giulia-Puntoni-Logo-bianco.png';

const getHeaderStyle = props => css`
    text-align:center;
`
const getLogoStyle = props => css`
    padding: 1em;
`


const HeaderContent = styled.div`${getHeaderStyle}`;
const Logo = styled.div`${getLogoStyle}`;


function Header() {
  return (
    <HeaderContent className="App-header">
      <Logo>
      <img src={logo} className="App-logo" alt="logo" />
      </Logo>
        
      </HeaderContent>
  );
}
export default Header