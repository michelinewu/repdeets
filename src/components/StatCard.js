import React from 'react'
import styled from 'styled-components'

import Container from '../theme/Container'

const StatCard = (props) => {
  return (
    <Container primary>
      {/* <div>""</div>
      <div>""</div>
      <div>""</div>
      <div>""</div>
      <div>""</div>
      <div>""</div>
      <div>""</div> */}

      <Pie>
        <Segment>ONE</Segment>
        {/* <div className="pie_segment" style={{ margin-right: 0px; }}></div> */}
        {/* <div class="pie_segment" style={{--offset: 40; value: 30; --bg: #22a7f0;}}></div> */}
        {/* <div class="pie_segment" style={{--offset: 0; value: 40; --bg: #2ecc71;}}></div> */}
      </Pie>
    </Container>
  )
}

export default StatCard

const Pie = styled.div`
  background: purple;
  border-radius: 100%;
  position: relative;
  height: calc(var(--size, 200) * 1px);
  width: calc(var(--size, 200) * 1px)
`

const Segment = styled.div`
  position: absolute;
  background: rgba(0, 0, 255, 0.5);
  // border: 5px dashed #000000;
  height: 100%;
  width: 100%;
  transform: translate(0, -50%) rotate(90deg) rotate(0deg);
  transform-origin: 50% 100%;

  :before {
    background: rgba(255, 0, 0, 0.5);
    content: '';
    height: 100%;
    position: absolute;
    transform: translate(0, 100%) rotate(45deg);
    // transform-origin: 66% 39%;
    transform-origin: 50% 0;
    width: 100%;
  }
`
