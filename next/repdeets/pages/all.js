import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import {Component} from 'react'

export default class All extends Component {

  // static async getInitialProps (context) {

  //   const senate = await fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  //     method: "GET",
  //     dataType: 'json',
  //     headers: {
  //       "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
  //     }})

  //   const congress = await fetch('https://api.propublica.org/congress/v1/116/house/members.json', {
  //   method: "GET",
  //   dataType: 'json',
  //   headers: {
  //     "X-API-Key": "REACT_APP_PROPUBLICA_KEY"
  //   }})

  //   const votes = await fetch(`https://api.propublica.org/congress/v1/members/C001084/votes.json`, {
  //     method: "GET",
  //     dataType: 'json',
  //     headers: {
  //       "X-API-Key": "REACT_APP_PROPUBLICA_KEY"
  //     }})

  //     const voteData = await votes.json()

  //   console.log ('votes = ', voteData)

  //   const senateData = await senate.json()
  //   const congressData = await congress.json()

  //   return {
  //     senate: senateData,
  //     house: congressData
  //   }
  // }

  render() {

    // const {officials, offices} = this.props.representatives

    const senate = this.props.senate.results[0]
    const house = this.props.house

    // console.log('this.props ', this.props)
    console.log('senate ', this.props.senate.results[0])
    // console.log('house ', this.props.house.results[0])
    console.log('senate[37] = ', senate.members[37])

    // console.log('this.props.officials ', officials)

    // create array to map over
    // let reps = []

    // offices.map((office) => {
    //   const role = office.name // e.g. U.S. Senator
    //   const indexes = office.officialIndices // representatives with these roles

    //   // console.log('offices = ', offices)
    //   // console.log ('offices.name = ', office.name)
    //   // console.log ('offices.officialIndices = ', office.officialIndices)
    //   indexes.forEach((index) => {

    //     // make url
    //     const urlName = officials[index]
    //       .name
    //       .toLowerCase()
    //       .split(' ')
    //       .join('-')
    //       .split('')
    //       .filter(char => char !== '.')
    //       .join('')

    //     const repObj = {
    //       ...officials[index],
    //       id: index,
    //       role: role,
    //       urlName: urlName
    //     }
    //     reps.push(repObj)
    //   })
    // })
    // // console.log('reps = ', reps)

    return (
      <div>
        <Layout>
          <Head>
              <title>New York Representatives</title>
          </Head>
          <h1>All Representatives</h1>
          <Link as={`/${senate.members[37].id}`} href="/[deets]">Harris</Link>
        </Layout>
      </div>
      )
    }
}
