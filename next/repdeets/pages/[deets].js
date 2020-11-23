import { useRouter } from "next/router";
// import ny from './ny'

import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

import RenderData from './RenderData'

import React from 'react'

// const Twitter = require('twitter');

const Deets = (props) => {


  const router = useRouter();
  // const { urlName } = router.query; // Destructuring our router object
  // console.log('router.query = ', router.query)

  const rq = router.query
  // console.log('rq = ', rq)

  // console.log('props = ', props)

  // console.log('official = ', props.official)
  const data = parseDataForDisplay(props)
  console.log('twitter data ', props.twitter)
  console.log('data returned: ', data)

  return (

    <div>
       <Layout>
         <Head>
             <title>New York Representatives</title>
         </Head>
         <h1>New York Representatives</h1>
         Data here
         {data.map((row) => {
            <RenderData id = {row.id} props={row.props} />
            }
         )}
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    </div>
  );
};

Deets.getInitialProps = async ({query}) => {

  // PRO PUBLICA
  const proPublicaID = query.deets

  const rep = await fetch(`https://api.propublica.org/congress/v1/members/${proPublicaID}.json`, {
      method: "GET",
      dataType: 'json',
      headers: {
        "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
      }})

  const votes = await fetch(`https://api.propublica.org/congress/v1/members/${proPublicaID}/votes.json`, {
      method: "GET",
      dataType: 'json',
      headers: {
        "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
      }})
  const cosponsoredBills = await fetch(`https://api.propublica.org/congress/v1/members/${proPublicaID}/bills/cosponsored.json`, {
    method: "GET",
    dataType: 'json',
    headers: {
      "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
    }})
  const personalExplanations = await fetch(`https://api.propublica.org/congress/v1/members/${proPublicaID}/explanations/115/votes.json`, {
    method: "GET",
    dataType: 'json',
    headers: {
      "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
    }})
  const officeStatements = await fetch(`https://api.propublica.org/congress/v1/members/${proPublicaID}/statements/115.json`, {
    method: "GET",
    dataType: 'json',
    headers: {
      "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
    }})


  const repData = await rep.json()
  const voteData = await votes.json()
  const billData = await cosponsoredBills.json()
  const explanationData = await personalExplanations.json()
  const statementData = await officeStatements.json()

  // TWITTER
  const twitterHandle = repData.results[0].twitter_account

  const bearer = "Bearer "+process.env.REACT_APP_TWITTER_BEARER_TOKEN
  const tweets = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kamalaharris&count=2`, {
    method: "GET",
    dataType: 'json',
    headers: {
      "Authorization": bearer
    }})

    const twitterData = await tweets.json()
  // const client = new Twitter({
  //   consumer_key: process.env.REACT_APP_TWITTER_API_KEY,
  //   consumer_secret: process.env.REACT_APP_TWITTER_API_SECRET,
  //   bearer_token: process.env.REACT_APP_TWITTER_BEARER_TOKEN
  // });

  // will use twitterHandle in future
  // const params = {screen_name: 'KamalaHarris'}

  // const twitterData = []

  // client.get('statuses/user_timeline', params, function(error, tweets, response) {
  //   if (!error) {
  //     twitterData = tweets
  //   }
  // })

  // console.log ('votes = ', voteData)
  // console.log ('bills = ', billData)
  // console.log ('explanations = ', explanationData)
  // console.log ('statements = ', statementData)

  return {
    rep: repData,
    votes: voteData,
    bills: billData,
    explanations: explanationData,
    statements: statementData,
    twitter: twitterData
  }
}

const parseDataForDisplay = (props) => {

  const votes = props.votes.results[0].votes
  const bills = props.bills.results[0].bills
  const explanations = props.explanations.results
  const statements = props.statements.results

  const dataToDisplay = []

  votes.map((vote) => {
    const voteObj = {
      type: "vote",
      id: vote.bill.bill_id,
      date: vote.date,
      description: vote.description,
      question: vote.question,
      position: vote.position
    }
    dataToDisplay.push(voteObj)
  })

  bills.map((bill) => {
    const billObj = {
      type: "bill",
      id: bill.bill_id,
      bill_type: bill.bill_type,
      date: bill.latest_major_action_date,
      introduced_date: bill.introduced_date,
      description: bill.short_title,
      url: bill.congressdotgov_url,
      house_passage: bill.house_passage,
      senate_passage: bill.senate_passage,
      sponsored: bill.sponsor_name,
      primary_subject: bill. primary_subject
    }
    dataToDisplay.push(billObj)
  })

  explanations.map((explanation) => {
    const explanationObj = {
      type: "explanation",
      category: explanation.category,
      date: explanation.date,
      position: explanation.position,
      text: explanation.text,
    }
    dataToDisplay.push(explanationObj)
  })

  statements.map((statement) => {
    const statementObj = {
      type: "statement",
      statement_type: statement.statement_type,
      date: statement.date,
      title: statement.title,
      url: statement.url,
    }
    dataToDisplay.push(statementObj)
  })

  dataToDisplay.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });

  return dataToDisplay
  // console.log ('votes = ', votes)
  // console.log ('bills = ', bills)
  // console.log ('explanations = ', explanations)
  // console.log ('statements = ', statements)
}

export default Deets
