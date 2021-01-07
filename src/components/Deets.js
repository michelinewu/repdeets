import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'

// import {NavLink} from 'react-router-dom'

import DataCard from './DataCard'

const Deets = (props) => {

  const [rep, setRep] = useState({})
  const [repData, setRepData] = useState({})
  const [displayedData, setDisplayedData] = useState([])

  useEffect(() => {
    if (displayedData.length === 0) {
      // if this is the initial render, fetch all of the rep's data

      async function fetchRepData () {

        // PROPUBLICA
        const bioID = props.match.params.repId

        const options = {
          method: "GET",
          dataType: 'json',
          headers: {
            "X-API-Key": "TGkh3C1itWVndTQszOjzlCR9IeVmKzl0B2ahqay6"
          }
        }

        // REP INFO
        const repInfo = await axios.get(`https://api.propublica.org/congress/v1/members/${bioID}.json`, options)

        // VOTES
        // let votes = await axios.get(`https://api.propublica.org/congress/v1/members/${bioID}/votes.json`, options)
        // // get congress.gov url for every vote
        // const allVotes = votes.data.results[0].votes
        // const voteData = Promise.all(allVotes.map(async (vote) => {
        //   const billUri = vote.bill.bill_uri
        //   const billUrl = await axios.get(billUri, options)
        //   const url = billUrl.data.results[0].congressdotgov_url
        //   console.log('url ', url)
        //   const toReturn = {...vote, url: url}
        //   // console.log('toReturn ', toReturn)
        //   return Promise.resolve(toReturn)
        // }))


        const voteData = await axios.get(`https://api.propublica.org/congress/v1/members/${bioID}/votes.json`, options)

        // BILL SPONSORSHIPS
        const billData = await axios.get(`https://api.propublica.org/congress/v1/members/${bioID}/bills/cosponsored.json`, options)

        // ABSENCE EXPLANATIONS
        const explanationData = await axios.get(`https://api.propublica.org/congress/v1/members/${bioID}/explanations/115.json`, options)

        // PR STATEMENTS
        const statementData = await axios.get(`https://api.propublica.org/congress/v1/members/${bioID}/statements/115.json`, options)

        // SET REP PROP
        setRep(repInfo.data.results[0])

        // NEWS API

        const name = [repInfo.data.results[0].first_name, repInfo.data.results[0].middle_name, repInfo.data.results[0].last_name].join('+')


        const url = 'http://newsapi.org/v2/everything?' +
        `q=${name}&` +
        // 'start=2019-08-01&end=2020-11-23' +
        'sortBy=popularity&' +
        `apiKey=a86349aff4d04c6c81e04c28df0f6ba3`;

        const newsData = await axios.get(url, {
        method: "GET",
        dataType: 'json',
        headers: {
        "X-Api-Key": "a86349aff4d04c6c81e04c28df0f6ba3"
        }})

        // TWITTER

        // let twitterData = [];

        // if (repInfo.data.results[0].twitter_account !== null) {
        //   // if there is a twitter account

        //   const twitterHandle = repInfo.data.results[0].twitter_account

        //   // const bearer = "Bearer " + "AAAAAAAAAAAAAAAAAAAAAMTlJwEAAAAAKZTDLrh0uNw9peMxnCG6orSOm2I%3DofEkAVSBwUtudhDTt81QWkSpsF9MT7usm1vOikv7Zpj9BJa98J"
        //   const bearer = 'Bearer AAAAAAAAAAAAAAAAAAAAAMTlJwEAAAAAKZTDLrh0uNw9peMxnCG6orSOm2I%3DofEkAVSBwUtudhDTt81QWkSpsF9MT7usm1vOikv7Zpj9BJa98J'
        //   const tweets = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${twitterHandle}&count=100&tweet_mode=extended`, {
        //   method: "GET",
        //   dataType: 'json',
        //   headers: {
        //     "Authorization": bearer
        //   }})

        //   twitterData = await tweets.json()
        // }

        const initialQueryResults = {
          rep: repInfo.data,
          votes: voteData.data.results[0].votes,
          bills: billData.data.results[0].bills,
          explanations: explanationData.data.results,
          statements: statementData.data.results,
          news: newsData.data.articles,
          // twitter: twitterData.data
        }

        setRepData (initialQueryResults)

        // set data for the initial
        setDisplayedData(parseDataForDisplay(initialQueryResults))

      }

      fetchRepData()
    }


    // setDisplayedData(repData)

  },[])

  // PARSE DATA

const parseDataForDisplay = (data) => {

  const { votes, bills, explanations, statements, twitter, news } = data

  console.log('news ', news)

  // console.log('repData ', data)

  // const votes = props.votes.results[0].votes
  // const bills = props.bills.results[0].bills
  // const explanations = props.explanations.results
  // const statements = props.statements.results
  // const tweets = props.twitter
  // const newsArticles = props.news.articles

  const dataToDisplay = []

  votes.map((vote) => {
    const voteObj = {
      type: "vote",
      id: vote.bill.bill_id,
      date: vote.date,
      title: vote.description,
      description: vote.bill.title,
      result: vote.result,
      yes: vote.total.yes,
      no: vote.total.no,
      present: vote.total.present,
      not_voting: vote.total.not_voting,
      position: vote.position,
      question: vote.question,
      // url: vote.url
    }
    dataToDisplay.push(voteObj)
  })

  bills.map((bill) => {

    let cosponsors_by_party = []
    if (bill.cosponsors_by_party) {
      cosponsors_by_party = Object
        .entries(bill.cosponsors_by_party)
        .map ((party) => {

          // console.log('party[0] ',party[0])
          // console.log('party[1] ',party[1])

          if (party[0] === "D") {
            cosponsors_by_party.push(["Democrat", party[1]])
          } else if (party[0] === "R") {
            cosponsors_by_party.push(["Republican", party[1]])
          } else {
            cosponsors_by_party.push(["Other", party[1]])
          }
        })
    }

    console.log('cosponsors_by_party ', cosponsors_by_party)

    const billObj = {
      type: "bill",
      id: bill.bill_id,
      bill_type: bill.bill_type,
      date: bill.introduced_date,
      latest_major_action_date: bill.latest_major_action_date,
      title: bill.short_title,
      description: bill.title,
      url: bill.congressdotgov_url,
      house_passage: bill.house_passage,
      senate_passage: bill.senate_passage,
      vetoed: bill.vetoed,
      active: bill.active,
      sponsored: `${bill.sponsor_title} ${bill.sponsor_name}`,
      cosponsors: bill.cosponsors,
      cosponsors_by_party: cosponsors_by_party,
      primary_subject: bill.primary_subject,
      latest_major_action: bill.latest_major_action
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

  // if (twitter.length > 0) {
  //   twitter.map((tweet) => {
  //     const tweetObj = {
  //       type: "twitter",
  //       date: tweet.created_at,
  //       text: tweet.text
  //     }
  //     dataToDisplay.push(tweetObj)
  //   })
  // }

  news.map((article) => {
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

  const name = [rep.first_name, rep.middle_name, rep.last_name].join(' ')
  // const title = `${rep.roles[0].title.split(' ', 2)[0]} ${rep.roles[0].state}`

  return (
    <>
    <title>DEETS</title>
      <h1 className="deets-page">{name}</h1>
      {/* <h2 className="deets-page">{title}</h2> */}
      {/* <h5> <NavLink href="/"><a>Back to home</a></NavLink></h5> */}
      <h3 className="deets-page"><i>Deets</i></h3>
      <DeetsList>
        {displayedData.map((row) => (
          <div>
            <DataCard key={row.id} row={row} />
        </div>
        ))}
      </DeetsList>
    <h2>
      {/* <NavLink as="/" href="/index"> */}
        <a>Back to home</a>
      {/* </NavLink> */}
    </h2>

    </>
  )
}

export default Deets

const DeetsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  max-width: 2600px;
  min-width: 80%;
`
