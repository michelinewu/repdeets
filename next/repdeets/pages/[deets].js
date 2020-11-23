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
  const data = parseDataForDisplay(props)
  // console.log('data returned: ', data)

  const rep = props.rep.results[0]
  const name = [rep.first_name, rep.middle_name, rep.last_name].join(' ')
  const title = `${rep.roles[0].title.split(' ', 2)[0]} ${rep.roles[0].state}`

  return (

    <div>
       <Layout>
         <Head>
          <title>{name}</title>
         </Head>
         <h1>{name}</h1>
         <h2>{title}</h2>
         <h5> <Link href="/"><a>Back to home</a></Link></h5>
         Data here
         {data.map((row) => (
           <div>
              <RenderData row={row} />
          </div>

           ))}
         {/* {data.map((row) => {
            <div>
              Rendering
              <RenderData props={row} />
            </div>

            }
         )} */}
        <h2>
          <Link as="/" href="/index">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    </div>
  )
}

// FETCH DATA

Deets.getInitialProps = async ({query}) => {

  // PRO PUBLICA
  console.log(query.deets)
  const proPublicaID = query.deets.slice(2)
  console.log(proPublicaID)

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

  const url = 'http://newsapi.org/v2/everything?' +
  'q=Kamala+Harris&' +
  // 'start=2019-08-01&end=2020-11-23' +
  'sortBy=popularity&' +
  'apiKey=a86349aff4d04c6c81e04c28df0f6ba3';

  // NEWS

  const newsArticles = await fetch(url, {
  method: "GET",
  dataType: 'json',
  headers: {
  "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY
  }})

  const newsData = await newsArticles.json()

  // TWITTER

  let twitterData = null;

  if (repData.results[0].twitter_account !== null) {
    // if there is a twitter

    const twitterHandle = repData.results[0].twitter_account

    const bearer = "Bearer " + process.env.REACT_APP_TWITTER_BEARER_TOKEN
    const tweets = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${twitterHandle}&count=100`, {
    method: "GET",
    dataType: 'json',
    headers: {
      "Authorization": bearer
    }})

    twitterData = await tweets.json()
  }

  return {
    rep: repData,
    votes: voteData,
    bills: billData,
    explanations: explanationData,
    statements: statementData,
    twitter: twitterData,
    news: newsData
  }
  return { rep: 'rep'}
}

// PARSE DATA

const parseDataForDisplay = (props) => {

  const votes = props.votes.results[0].votes
  const bills = props.bills.results[0].bills
  const explanations = props.explanations.results
  const statements = props.statements.results
  const tweets = props.twitter
  const newsArticles = props.news.articles

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

  if (tweets) {
    tweets.map((tweet) => {
      const tweetObj = {
        type: "twitter",
        date: tweet.created_at,
        // url: tweet.entities.urls[0], // not sure about this, will have to test
        text: tweet.text
      }
      dataToDisplay.push(tweetObj)
    })
  }

  newsArticles.map((article) => {
    const newsObj = {
      type: "news",
      date: article.publishedAt,
      source: article.source.name,
      title: article.title,
      author: article.author,
      url: article.url
    }
    dataToDisplay.push(newsObj)
  })

  dataToDisplay.sort(function(a,b){
    // Turn strings into dates, and then subtract
    return new Date(b.date) - new Date(a.date);
  });

  return dataToDisplay
}

export default Deets
