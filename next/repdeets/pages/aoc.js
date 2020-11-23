import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

import {Component} from 'react'

const rep = {
  "name": "Alexandria Ocasio-Cortez",
  "address": [
    {
      "line1": "229 Cannon House Office Building",
      "city": "Washington",
      "state": "DC",
      "zip": "20515"
    }
  ],
  "party": "Democratic Party",
  "phones": [
    "(202) 225-3965"
  ],
  "urls": [
    "https://ocasio-cortez.house.gov/"
  ],
  "channels": [
    {
      "type": "Facebook",
      "id": "repAOC"
    },
    {
      "type": "Twitter",
      "id": "RepAOC"
    }
  ],
  "id": 15,
  "role": "U.S. Representative",
  "urlName": "alexandria-ocasio-cortez"
}

export default class AOC extends Component {

  static async getInitialProps (context) {
    const twitterFeed = await fetch('http://api.twitter.com/user/RepAOC')

    const twitterData = await twitterFeed.json()

    const response = await fetch('https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3Any?levels=country&recursive=true&key=REACT_APP_GOOGLE_CIVIC_API_KEY')

    // const data = await response.json()
    console.log('data fetched = ', twitterData)

    return {
      representatives: data
    }
  }

  render() {
    return (

      <div>
         <Layout>
           <Head>
               <title>AOC</title>
           </Head>
           <h1>AOC</h1>
           {/* {reps.map((official) => (
            <div>
              <div>Role: {official.role}</div>
              <div>Name: {official.name}</div>
              <div>Twitter: @{official.channels.map((channel) => {
                if (channel.type === "Twitter") return channel.id})}
              </div>
              <br />
            </div>
          ))} */}
          <h2>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </h2>
        </Layout>
      </div>
    );
  }
};














//   return (
//     <div>
//       <Layout>
//         <Head>
//             <title>New York Representatives</title>
//         </Head>
//         <h1>New York Representatives</h1>
//         {reps.map((official) => (
//           <div>
//             <div>Role: {official.role}</div>
//             <div>Name: {official.name}</div>
//             <div>Twitter: @{official.channels.map((channel) => {
//               if (channel.type === "Twitter") return channel.id})}
//             </div>
//             <br />
//           </div>
//         ))}
//         <h2>
//           <Link href="/">
//             <a>Back to home</a>
//           </Link>
//         </h2>
//       </Layout>
//     </div>
//   )
// }


