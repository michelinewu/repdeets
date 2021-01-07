import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html {
    margin: 0px;
    height: 100vh;
  }

  body {
    margin: 0px;
    // min-height: calc (100vh - 2.5rem);
    // background-color: #2850a0;
    // background-image: linear-gradient(to right top, #073590, #23358f, #32348e, #3e348d, #48338c, #5c2b84, #6c227b, #791770, #890057, #90003d, #8f0021, #870000);
    // background-image: linear-gradient(to right top, #325d8d, #6e709b, #9886a6, #b8a0b3, #d0bdc4, #d5bec3, #dabfc2, #dec0c0, #d4a4a4, #c98888, #bd6d6c, #af5151);
    // background-image: linear-gradient(to right top, #b0b0bc, #b6b6c0, #bcbcc4, #c2c2c9, #c8c8cd, #cccbd0, #d0cfd2, #d4d2d5, #d7d4d6, #dad5d8, #ddd7d8, #e0d9d9);
    background-image: linear-gradient(to right top, #757b84, #80868f, #8c919a, #979da6, #a3a8b1, #adb3bb, #b7bec5, #c1c9cf, #cdd5d9, #dae2e4, #e8eeef, #f6fafa);
    background-repeat: no-repeat;
    background-attachment: fixed;
    font-family: 'Lato', sans-serif;
    color: #000000;
  }

  // footer {
  //   height: 2.5rem;
  //   color: white;
  //   position: absolute;
  //   bottom: 0;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // }

  a {
    color: black;
    text-decoration: none;
  }

  .deets-box-bg {
    border: 2px solid dimgray;
    background-color: white;
    opacity: .5;
    ;
    padding-left:30px;
    padding-right:30px;
    margin-bottom: 20px;
  }

  .deets-box {
    opacity: 1;
    position: relative;
  }

  .deets-box ul{
    list-style-type: none;
    margin-left: 0;
    padding: 0;
  }

  .deets-button {
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
  }

`
export default GlobalStyle
