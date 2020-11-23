import React from 'react'

const RenderData = (props) => {

  if ((props.type) === "vote") {
    return (
      <div>
        <h3>Vote:</h3>
        <div>{props.id}</div>
        <div>{props.date}</div>
        <div>{props.description}</div>
        <div>{props.question}</div>
        <div>{props.position}</div>
      </div>
    )
  } else {
    return (
      <div>
        Error Rendering.
      </div>
    )
  }
}

export default RenderData
