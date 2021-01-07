import styled from 'styled-components'

const FooterStyling = styled.div`
  height: 2.5rem;
  color: white;
  position: absolute;
  bottom: 0px;
  text-align: center;
  width: 100%;
`
const StyledFooter = ({children}) => {
  return (
    <FooterStyling>{children}</FooterStyling>
  )
}

export default StyledFooter
