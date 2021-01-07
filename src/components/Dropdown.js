import React, {useState} from 'react'
import styled from 'styled-components'

const Dropdown = (props) => {

  const {menuName, menuItems, callBack} = props

  const [isShown, setShown] = useState(false)

  return(
    <>
      <Menu
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
      {menuName}

        {isShown ?
        <AllMenuItems>
          {menuName === "Chamber" ? menuItems.map(item => <MenuItem href="#" value={item} onClick={(event) => callBack(event)}>{item}</MenuItem>)
          : menuItems.map(item => <MenuItem href="#" value={item} onClick={(event) => callBack(event)}>{item}</MenuItem>)}
        </AllMenuItems>
        : ''}
      </Menu>
    </>
  )
}

export default Dropdown

const Menu = styled.div`
  background-color: #242424;
  font-family: 'Playfair Display', serif;
  color: #ffffff;
  padding: 10px;
  margin-right: 10px;
  // position: absolute;
  left: 10px;

  :hover {
    background-color: #a1a1a1;
    color: #000000;
    z-index: 2;
  }
`

const AllMenuItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 300px;
  z-index: 2;
  left: 0px;
`

const MenuItem = styled.a`
  background-color: #fefefe;
  color: #000000;
  padding: 10px;
  width: 20px;

  :hover {
    color: #242424;
  }
`
