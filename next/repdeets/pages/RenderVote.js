import React from 'react'

const RenderVote = (props) => {

  const {id, date, description, question, position } = props

  return (
    <div>
      <h3>Vote:</h3>
      <div>{id}</div>
      <div>{date}</div>
      <div>{description}</div>
      <div>{question}</div>
      <div>{position}</div>
    </div>
  )
}

export default RenderVote
