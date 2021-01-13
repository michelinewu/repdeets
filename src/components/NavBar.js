import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const NavBar = () => {
  // props will need to handle filtering

  return (
    <Navigation>
      <a href="/">Home</a>
      {/* <NavLink to="/">Home</NavLink> */}
    </Navigation>
  )
}

export default NavBar

const Navigation = styled.nav`
  border-bottom: 1px solid #242424;
  width: 100%;
  // background-color: #adb3bb;
  background-color: #242424;
  color: #ffffff;
  text-align: center;
  padding: 10px 0px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    color: #ffffff;
  }

  a :hover {
    text-decoration: underline;
  }
`
