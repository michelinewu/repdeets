import styled from 'styled-components'

const StyledButton = styled.a`
  width: 80px;
  background-color: #a1a1a1;
  color: #ffffff;
  font-style: italic;
  font-family: 'Playfair Display', serif;
  font-size: 1.05em;
  letter-spacing: 1.45px;
  font-weight: 750;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  text-align: center;
  border: 0px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    font-family: 'Playfair Display', serif;
    color: #ffffff;
  }

  :hover {
    background-color: #242424;
  }

  :focus {
    outline: 1px solid #6d6d6e;
  }
`

const Button = ({ primary, children, href, target}) => {
  return (
    <StyledButton primary={primary} href={href} target={target}>{children}</StyledButton>
  )
}

export default Button
