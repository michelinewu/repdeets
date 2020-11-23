import React from 'react'

const RenderData = (props) => {

  const {type} = props.row
  const data = props.row

  console.log('Rendering ', props.row.type)
  console.log('Props = ', props.row)

  if ((type) === "vote") {

    return (
      <div>
        <h3>Vote:</h3>
        <ul>
          <li>Date: {data.date}</li>
          <li>Description: {data.description}</li>
          <li>ID: {data.id}</li>
          <li>Position: {data.position}</li>
          <li>Question: {data.question}</li>
        </ul>
      </div>
    )
  } else if ((type) === "bill") {
    return (
    <div>
        <h3>Bill:</h3>
        <ul>
          <li>Date: {data.date}</li>
          <li>Description: {data.description}</li>
          <li>House Passed: {data.house_passage}</li>
          <li>Senate Passed: {data.senate_passage}</li>
          <li>Primary Subject: {data.primary_subject}</li>
          <li>ID: {data.id}</li>
          <li>Introduced Date: {data.introduced_date}</li>
          <li>Sponsored: {data.sponsored}</li>
          <li>Url: {data.url}</li>
        </ul>
      </div>
    )

  } else if ((type) === "explanation") {
    return (
    <div>
        <h3>Statement:</h3>
        <ul>
          <li>Date: {data.date}</li>
          <li>Text: {data.text}</li>
          <li>Position: {data.position}</li>
          <li>Category: {data.category}</li>
        </ul>
      </div>
    )

  } else if ((type) === "statement") {
    return (
    <div>
        <h3>Statement:</h3>
        <ul>
          <li>Date: {data.date}</li>
          <li>Statement Type: {data.statement_type}</li>
          <li>Title: {data.title}</li>
          <li>Url: {data.url}</li>
        </ul>
      </div>
    )

  } else if ((type) === "news") {
    return (
    <div>
        <h3>News:</h3>
        <ul>
          <li>Date: {data.date}</li>
          <li>Title: {data.title}</li>
          <li>Author: {data.author}</li>
          <li>Source: {data.source}</li>
          <li>Url: {data.url}</li>
        </ul>
      </div>
    )

  } else if ((type) === "twitter") {
    return (
      <div>
      <h3>Twitter:</h3>
      <ul>
        <li>Date: {data.date}</li>
        <li>Text: {data.text}</li>
      </ul>
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
