import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Button from '../theme/Button'

import axios from 'axios'

const DataCard = (props) => {

  const {type} = props.row
  const data = props.row

  if ((type) === "vote") {

    // console.log('data.url ', data.url)

    // const billUrl = fetchBillUrl()

    // console.log('billUrl ', billUrl)

    const billUrl = ""

    return (
        <DeetsContainer>
          <DeetHeading><DeetHeadingText>Vote</DeetHeadingText><DeetDate>{data.date}</DeetDate></DeetHeading>
          <VoteText>
            <Row><Title>{data.title || <NotAvailable>Info Missing:</NotAvailable>}</Title></Row>
            <Row><Heading>ID:</Heading>{data.id.toUpperCase() || <NotAvailable>Not Available</NotAvailable>}</Row>
            <Row><Heading>Description:</Heading></Row>
            <Row><Info>{data.description || <NotAvailable>Not Available</NotAvailable>}</Info></Row>
             {/*More Info: <a href={billUrl} target="_blank">{billUrl}</a>*/}
            {/* <li>ID: {data.id} Result: {data.result} More Info: <a href={fetchBillUrl()} target="_blank">{fetchBillUrl()}</a></li> */}
            <Row><Heading>Question:</Heading> {data.question || <NotAvailable>No Question</NotAvailable>}</Row>
          </VoteText>
          <VoteStats>
            <Row><StatTitle>Yes:</StatTitle><StatInfo>{data.yes >= 0 ? data.yes : <NotAvailable>Pending Vote</NotAvailable>}</StatInfo></Row>
            <Row><StatTitle>No:</StatTitle><StatInfo>{data.no >= 0 ? data.no : <NotAvailable>Pending Vote</NotAvailable>}</StatInfo></Row>
            <Row><StatTitle>Present:</StatTitle><StatInfo>{data.present >= 0 ? data.present : <NotAvailable>Pending Vote</NotAvailable>}</StatInfo></Row>
            <Row><StatTitle>Not Voting:</StatTitle><StatInfo>{data.not_voting >= 0 ? data.not_voting :  <NotAvailable>Pending Vote</NotAvailable>}</StatInfo></Row>
            <Row><StatTitle>Status:</StatTitle><StatInfo>{data.result || <NotAvailable>Pending Vote</NotAvailable>}</StatInfo></Row>
          </VoteStats>
          <DeetHeading><DeetHeadingText>Position:</DeetHeadingText><VoteResult>{data.position || <NotAvailable>Pending Vote</NotAvailable>}</VoteResult></DeetHeading>
        </DeetsContainer>

    )
  } else if ((type) === "bill") {

    // console.log('bill data', data)

    return (
      <DeetsContainer>
        <DeetHeading><DeetHeadingText>Bill Sponsored</DeetHeadingText><DeetDate>{data.date}</DeetDate></DeetHeading>
        <Table>
          <Row><Title>{data.title}</Title></Row>
          <Row><Heading>Description:</Heading> {data.description  || <NotAvailable>Pending Vote</NotAvailable>}</Row>
          <Row><Heading>House Passed:</Heading>{data.house_passage  || <NotAvailable>Pending Vote</NotAvailable>}</Row>
          <Row><Heading>Senate Passed:</Heading>{data.senate_passage  || <NotAvailable>Pending Vote</NotAvailable>}</Row>
          <Row><Heading>Vetoed:</Heading>{data.senate_passage  || <NotAvailable>Pending Vote</NotAvailable>}</Row>
          <Row><Heading>Primary Subject:</Heading>{data.primary_subject  || <NotAvailable>Info Missing</NotAvailable>}</Row>
          <Row><Heading>ID:</Heading>{data.id.toUpperCase()  || <NotAvailable>Info Missing</NotAvailable>}</Row>
          <Row><Heading>Last Major Action Date:</Heading>{data.latest_major_action_date  || <NotAvailable>Info Missing</NotAvailable>}</Row>
          <Row><Heading>Latest Major Action:</Heading>{data.latest_major_action  || <NotAvailable>Info Missing</NotAvailable>}</Row>
          <Row><Heading>Sponsored:</Heading>{data.sponsored  || <NotAvailable>Info Missing</NotAvailable>}</Row>
          <Row><Heading>Cosponsors:</Heading>{data.cosponsors  || <NotAvailable>Info Missing</NotAvailable>}</Row>
          {/* <Row><Heading>Cosponsors by Party:</Heading>{data.cosponsors_by_party ? data.cosponsors_by_party.map((party) => {
            `${party[0]} ${party[1]}`
          }) : ""}</Row> */}
        </Table>
        <Button href={data.url} target="_blank">More Info</Button>
        <DeetFooter />
      </DeetsContainer>
    )

  } else if ((type) === "explanation") {

    return (
      <DeetsContainer>
        <DeetHeading><DeetHeadingText>Absence Explanation</DeetHeadingText><DeetDate>{data.date}</DeetDate></DeetHeading>
        <Table>
          <Row><Heading>Text:</Heading>{data.text}</Row>
          <Row><Heading>Position:</Heading>{data.position}</Row>
          <Row><Heading>Category:</Heading>{data.category}</Row>
        </Table>
      </DeetsContainer>
    )

  } else if ((type) === "statement") {
    return (
      <DeetsContainer>
        <DeetHeading><DeetHeadingText>Statement</DeetHeadingText><DeetDate>{data.date}</DeetDate></DeetHeading>
        <Table>
          <Row><Heading>Statement Type:</Heading>{data.statement_type}</Row>
          <Row><Heading>Title:</Heading>{data.title}</Row>
          <Row><Heading>Url:</Heading><a href={data.url} target="_blank">{data.url}</a></Row>
        </Table>
      </DeetsContainer>
    )

  } else if ((type) === "news") {

    return (

      <DeetsContainer>
        <DeetHeading><DeetHeadingText>News</DeetHeadingText><DeetDate>{data.date.slice(0,10)}</DeetDate></DeetHeading>
        <Table>
          <Row><Heading>Title:</Heading>{data.title}</Row>
          <Row><Heading>Author:</Heading>{data.author}</Row>
          <Row><Heading>Source:</Heading>{data.source}</Row>
          <Row><Heading>Url:</Heading><a href={data.url} target="_blank">{data.url}</a></Row>
        </Table>
      </DeetsContainer>
    )

  } else if ((type) === "twitter") {
    return (
      <div>
        <div className="deets-box-bg">
        <div className="deets-box">
          <h3>Twitter:</h3>
          <ul>
            <li>Date: {data.date}</li>
            <li>Text: {data.text}</li>
          </ul>
        </div>
        </div>
      </div>
    )

  } else {
    return (
      <div className="deets-box">
        Error Rendering.
      </div>
    )
  }
}

export default DataCard

const DeetsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
  width: 100%;
  text-align: left;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 40px;
`

const DeetHeading = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #242424;
  font-size: 1.15em;
  font-weight: 650;
  padding: 15px 30px;
  letter-spacing: 1.35px;
  color: #ffffff;
  font-family: 'Playfair Display', serif;
  width: 100%;
  position: relative;
`

const DeetFooter = styled.div`
  height: 7px;
  width: 100%;
  background-color: #242424;
`

const DeetHeadingText = styled.div`
  text-align: left;
  width: 50%;
`
const DeetDate = styled.div`
  text-align: right;
  width: 50%;
`

const Title = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.45em;
  font-weight: 800;
  letter-spacing: .45px;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 10px;
  width: 100%;
`

const VoteText = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(70%);
  position: relative;
  font-weight: 800;
  left:-20px;
`

const VoteStats = styled.div`
  font-family: 'Lora', serif;
  font-weight: 800;
  font-size: .95em;
  letter-spacing: .5px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(30% - 80px);
  position: relative;
  margin-bottom: 10px;
`

const StatTitle = styled.div`
  width: 50%;
`

const StatInfo = styled.div`
  width: 50%;
  text-align: right;
`

const VoteResult = styled.div`
  position: absolute;
  width: calc(100% - 80px);
  text-align: center;
`

const Table = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  left: -50px;
  padding: 0px 30px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  left: 50px;
  width: 100%;
  margin-bottom: 3px;
`
const Heading = styled.div`
  font-weight: 650;
  text-align: left;
  text-decoration: underline;
  padding-bottom: 10px;
  text-underline-position: under;
  margin-right: 5px;
`
const Info = styled.div`
  text-align: left;
  width: auto;
  text-wrap: wrap;
  padding-bottom: 10px;
`

const NotAvailable = styled.span`
  color: silver;
`
