import React from 'react'
import styled from 'styled-components'

const Loading = () => {

  return (
    <Wrap>
        <Circle />
        <div>LOADING</div>
    </Wrap>
  )
}

export default Loading

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Circle = styled.div`
  margin: 50px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid gray;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`


