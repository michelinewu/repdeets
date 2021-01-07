import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const NavBar = () => {
  // props will need to handle filtering

  return (
    <Navigation>
      <NavLink to="/">Home</NavLink>
    </Navigation>
  )
}

export default NavBar

const Navigation = styled.nav`
  border-bottom: 1px solid #242424;
  width: 100%;
  background-color: #adb3bb;
`
