import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import {Component} from 'react'
// import PassPropsLink from './passpropslink'

// import { useRouter } from 'next/router'
// import Subdeets from './subdeets'
// import gapi from 'https://apis.google.com/js/api.js'
// import fetch from 'unfetch'

// const router = useRouter()

export default class NY extends Component {

  static async getInitialProps (context) {

    const response = await fetch('https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3Any?levels=country&recursive=true&key=REACT_APP_GOOGLE_CIVIC_API_KEY')

    const data = await response.json()
    console.log('data fetched = ', data)

    return {
      representatives: data
    }
  }

  render() {

    const {officials, offices} = this.props.representatives

    // console.log('this.props ', this.props)

    // console.log('this.props.officials ', officials)

    // create array to map over
    let reps = []

    offices.map((office) => {
      const role = office.name // e.g. U.S. Senator
      const indexes = office.officialIndices // representatives with these roles

      // console.log('offices = ', offices)
      // console.log ('offices.name = ', office.name)
      // console.log ('offices.officialIndices = ', office.officialIndices)
      indexes.forEach((index) => {

        // make url
        const urlName = officials[index]
          .name
          .toLowerCase()
          .split(' ')
          .join('-')
          .split('')
          .filter(char => char !== '.')
          .join('')

        const repObj = {
          ...officials[index],
          id: index,
          role: role,
          urlName: urlName
        }
        reps.push(repObj)
      })
    })
    // console.log('reps = ', reps)

    return (
      <div>
        <Layout>
          <Head>
              <title>New York Representatives</title>
          </Head>
          <h1>New York Representatives</h1>
          {reps.map((rep) => (
            <div key = {rep.id}>
              <div>Role: {rep.role}</div>
              <div>Name: {rep.name}</div>
              <div>Twitter: @{rep.channels.map((channel) => {
                if (channel.type === "Twitter") return channel.id})}

              </div>
              {console.log('in map rep = ', rep)}
              {/* <PassPropsLink href={`/${rep.urlName}`} rep={rep}>
                Link
              </PassPropsLink> */}

              <Link as={`/${rep.urlName}`} href="/[deets]">Deets</Link>

              <br />
            </div>
          ))}
          <h2>
          {/* <span onClick={() => router.push(`/deets`)}>Deets</span> */}
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </h2>
        </Layout>
      </div>
      )
    }
}

// export async function getInitialProps(context) {

//   const response = await fetch('https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3Any?levels=country&recursive=true&key=REACT_APP_GOOGLE_CIVIC_API_KEYGET https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3Any?levels=country&recursive=true&key=REACT_APP_GOOGLE_CIVIC_API_KEY  HTTP/1.')

//   const data = response.json()
//   console.log('data fetched = ', data)

//   return {
//     representatives: data
//   }
// }


// export async function getStaticProps(context) {

//   loadClient()
//   const data = execute()

//   console.log('data = ', data)
//   console.log('data.result = ', data.result)
//   console.log('data.result.officials = ', data.result.officials)

//   return {
//     props: {
//       representatives: data.result.officials
//     }
//   }
// }

// function loadClient() {
//   gapi.client.setApiKey("REACT_APP_GOOGLE_CIVIC_API_KEY");
//   return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
//       .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// }

// function execute() {
//   return gapi.client.civicinfo.representatives.representativeInfoByDivision({
//     "ocdId": "ocd-division/country:us/state:ny",
//     "levels": [
//       "country"
//     ],
//     "recursive": true
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }

// gapi.load("client");
