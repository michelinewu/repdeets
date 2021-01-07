import './App.css';
import {NavBar, Footer, Header} from './components'
import Routes from './routes'
import Container from './theme/Container'

// import GlobalStyle from './theme/globalStyle';

function App() {

  return (
    <>
      <Header />
      <NavBar />
      <Container primary>
        <Routes />
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default App;
