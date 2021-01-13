import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import IdCard from './IdCard'
import Loading from './Loading'
import Dropdown from './Dropdown'
import { set } from 'animejs'

const Home = (props) => {

  /*
  *   USESTATE & USEEFFECT
  */

  const [loading, setLoading] = useState(true)
  const [repsShown, setRepsShown] = useState([])
  const [initialQuery, setInitialQuery] = useState([])
  const [chamberMenuShown, setChamberMenu] = useState([false])
  const [stateMenuShown, setStateMenu] = useState([false])

  useEffect(() => {
    if (initialQuery.length === 0) {
      // if this is the initial render, make sure the list of representatives is up to date by fetching data from ProPublica
      async function fetchReps () {
        const options = {
          method: "GET",
          dataType: 'json',
          headers: {
            "X-API-Key": process.env.REACT_APP_PROPUBLICA_KEY
          }
        }
        const senateData = await axios.get('https://api.propublica.org/congress/v1/116/senate/members.json', options)
        const congressData = await axios.get('https://api.propublica.org/congress/v1/116/house/members.json', options)

        const reps = senateData.data.results[0].members
          .concat(congressData.data.results[0].members)
        // const reps = senateData.data.results[0].members

        // console.log(reps)

        setInitialQuery(reps)

        // eventually will show the last 30 reps queried on initial render but for now:
        setRepsShown(reps)

        // turn off loading animation
        setLoading(false)
      }
      fetchReps()
    }

  }, [])

  /*
  *   HELPER FUNCTIONS
  */

  // console.log('repsShown ', repsShown)

  // not tested
  const filterReps = (event) => {
    event.preventDefault()
    const filterParameter = event.target.toString().slice()[3]

    console.log('filterParameter ', filterParameter)

    if (filterParameter === "Representative") {
      // filter for house
      setRepsShown(repsShown.filter(rep => rep.title === "Representative"))
    } else if (filterParameter.includes("Senator")) {
      // filter for senate
      setRepsShown(repsShown.filter(rep => rep.title.includes("Senator")))
    } else if (filterParameter.length === 1) {
      // filter by last name
      setRepsShown(repsShown.filter(rep => rep.last_name.startsWith(filterParameter)))
    } else if (filterParameter.length === 2) {
      // filter by state
      setRepsShown(repsShown.filter(rep => rep.state.equals(filterParameter)))
    } else {
      // by default, show all representitives
      setRepsShown(initialQuery)
    }
  }

  /*
  *   RENDER PREP
  */

  /* ITEMS FOR DROPDOWN MENUS */
  const chambers = [ 'House', 'Senate' ]

  const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

  // there are a few house reps that are duplicated in the data returned by Propublica. This tracks the previous BioId to pull out the duplicates
  let prevBioId = ""

  // sort repsShown alphabetically
  repsShown.sort(function(a,b) {
    //compare last names
    const lastnameA = a.last_name.toLowerCase()
    const lastnameB = b.last_name.toLowerCase()

    if (lastnameA < lastnameB) {
      return -1
    } else if (lastnameA > lastnameB) {
      return 1
    } else {
      // compare first names
      const firstnameA = a.first_name.toLowerCase()
      const firstnameB = b.first_name.toLowerCase()

      if (firstnameA < firstnameB) {
        return -1
      } else if (firstnameA > firstnameB) {
        return 1
      } else {
        if (a.middle_name && b.middle_name) {
          const middlenameA = a.middle_name.toLowerCase()
          const middlenameB = b.middle_name.toLowerCase()

          if (middlenameA < middlenameB) {
            return -1
          } else if (middlenameA > middlenameB){
            return 1
          }
        }
      }
    }
    // if they're somehow equal
    return 0
  })

  return (
    <>
    <Tagline>What your reps do and say, and only that.</Tagline>
    {loading ? <Loading /> :
    <AllReps>
      <PageHeading>Representatives</PageHeading>
      {/* <Filters>Sort by:
        <Dropdown menuName='Chamber' menuItems={chambers} callBack={filterReps}/>
        <Dropdown menuName='State' menuItems={states} callBack={filterReps}/>
        <Dropdown menuName='Last Name' menuItems={alphabet} callBack={filterReps}/>
      </Filters> */}
      {/* <Search>Sort by: Chamber State</Search> */}
        <div className = "main">
          {repsShown.map((rep) => {
            if (prevBioId !== rep.id) {
              prevBioId = rep.id
              return (
                <IdCard key={rep.id}
                id={rep.id}
                title={rep.title}
                state={rep.state}
                district={rep.ocd_id.split('cd:')[1]}
                first_name={rep.first_name}
                middle_name={rep.middle_name}
                last_name={rep.last_name}
                suffix={rep.suffix}
                party={rep.party}
                url={rep.url}
                missed_votes={rep.missed_votes}
                missed_votes_pct={rep.missed_votes_pct}
                total_votes={rep.total_votes}
                votes_against_party_pct={rep.votes_against_party_pct}
                votes_with_party_pct={rep.votes_with_party_pct}
              />
              )
            }
          })}
        </div>
      </AllReps>}
    </>
  )
}

export default Home

const PageHeading = styled.h1`
  font-size: 3em;
  padding-bottom: 50px;
  font-weight: 800;
  font-family: 'Arimo', sans-serif;
`
const AllReps = styled.div`
`
const Tagline = styled.div`
  padding-top: 50px;
`
const Filters = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

const Search = styled.div`

`
