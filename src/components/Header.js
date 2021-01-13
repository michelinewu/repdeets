import React from 'react'
import styled from 'styled-components'

import Container from '../theme/Container'

const Header = () => {

  return (
    <Container primary>
      <Heading>Repdeets</Heading>
      <a href="https://github.com/michelinewu/repdeets" target="_blank"><GHLogo src="/images/GH-logo.png" alt="GitHub"/></a>
    </Container>
  )
}

export default Header

/* STYLED COMPONENTS */

const Heading = styled.div`
  font-family: 'Lora', serif;
  color: #ffffff;
  font-size: 4em;
  font-weight: 900;
  padding-top: 20px;
  width: 100%;
  // background-color: #adb3bb;
  background-color: #242424;
`
const GHLogo = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: auto;
`
