import styled from 'styled-components'

// Main wrapper around all components
const ContentWrapper = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: ${props => (props.primary ? 'column' : 'row')};
  align-items: center;
  font-size: 1.15em;
`

const Container = ({ primary, children }) => {
  return (
    <ContentWrapper primary={primary}>{children}</ContentWrapper>
  )
}

export default Container
