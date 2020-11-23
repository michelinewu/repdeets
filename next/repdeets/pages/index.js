import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'


export default function Home(props) {

  const senate = props.senate.results[0].members
  const house = props.house.results[0].members

  console.log('house ', house)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link as={`/${senate[37].id}`} href="/[deets]"> Test Harris</Link>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Senate</h2>
          {senate.map((rep) => (
              <li className={utilStyles.listItem} key={`S-${rep.id}`}>
                <Link as={`/S-${rep.id}`} href="/[deets]">{`${[rep.first_name, rep.middle_name, rep.last_name].join(' ')}`}</Link>,
                State: {rep.state}
              </li>
            ))}
        <h2 className={utilStyles.headingLg}>Congress</h2>
          {house.map((rep) => (
            <li className={utilStyles.listItem} key={`H-${rep.id}`}>
              <Link as={`/H-${rep.id}`} href="/[deets]">{`${[rep.first_name, rep.middle_name, rep.last_name].join(' ')}`}</Link>,
              State: {rep.state}
            </li>
          ))}
      </section>
    </Layout>
  )
}

Home.getInitialProps = async (context) => {

  const senate = await fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
    method: "GET",
    dataType: 'json',
    headers: {
      "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
    }})

  const congress = await fetch('https://api.propublica.org/congress/v1/116/house/members.json', {
  method: "GET",
  dataType: 'json',
  headers: {
    "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
  }})

  const votes = await fetch(`https://api.propublica.org/congress/v1/members/C001084/votes.json`, {
    method: "GET",
    dataType: 'json',
    headers: {
      "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
    }})

    const voteData = await votes.json()

  console.log ('votes = ', voteData)

  const senateData = await senate.json()
  const congressData = await congress.json()

  return {
    senate: senateData,
    house: congressData
  }
}
