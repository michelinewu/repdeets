import React from 'react'
import styled from 'styled-components'

import Container from '../theme/Container'

const Header = () => {

  return (
    <Container primary>
      {/* <Logo src="/images/logo-repdeets.png" alt="Repdeets"/> */}
      <Heading>Repdeets</Heading>
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

// const Logo = styled.img`
//   width: 500px;
//   height: auto;
// `
