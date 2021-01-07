import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

import Button from '../theme/Button'

// import anime from 'animejs'

export const IdCard = (props) => {

  // const [statsShown, setStatsShown] = useState(false)

  // const flipCard = (event) => {
  //   event.preventDefault()
  //   console.log('event.target.id ', event.target.repId)
  //   const repId = event.target.repId

  //   if (statsShown) return

  //   setStatsShown(true)
  //   anime({
  //     targets: repId,
  //     scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
  //     rotateY: {value: '+=180', delay: 200},
  //     easing: 'easeInOutSine',
  //     duration: 400,
  //     complete: function(anim){
  //       setStatsShown(false)
  //     }
  //   });
  // }


  // var card = document.querySelector(".card");
  // var playing = false;

  // card.addEventListener('click',function() {
  //   if(playing)
  //     return;

  //   playing = true;
  //   anime({
  //     targets: card,
  //     scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
  //     rotateY: {value: '+=180', delay: 200},
  //     easing: 'easeInOutSine',
  //     duration: 400,
  //     complete: function(anim){
  //       playing = false;
  //     }
  //   });
  // });

  const {id, title, state, district, first_name, middle_name, last_name, suffix, url} = props

  const name = [first_name, middle_name, last_name, suffix].join(' ')

  let party = ''

  if (props.party === "R") party = "Republican"
  else if (props.party === "D") party = "Democrat"
  else party = props.party

  // image url for Bioguide
  const imageUrl = `https://bioguideretro.congress.gov/Static_Files/data/photo/${id[0]}/${id}.jpg`

  // image url unitedstates.io
  // const imageUrl = `https://theunitedstates.io/images/congress/225x275/${id}.jpg`

  return (
    <Container>
      <RepName>{name}</RepName>
      <ImageCrop>
        <Headshot src={imageUrl ? imageUrl : "http://localhost:3000/images/default-headshot.png"} />
      </ImageCrop>
      <Table>
        <Row><Heading>Role:</Heading>
          <Info>
            {title === "Representative" ? "Representative of Congress" : title}
          </Info>
        </Row>
        <Row>
          <Heading>State:</Heading><Info>{state}</Info>
          {district ?
            <span>, District {district}</span>
            : <></>
          }
        </Row>
        <Row><Heading>Party:</Heading><Info>{party}</Info></Row>
      </Table>
      <MoreInfo>
        {/* <NavButton href={`/${id}`}>deets</NavButton> */}
        <NavLink to={`/${id}`} className="deets-button">deets</NavLink>
        {/* <Button>stats</Button> */}
        <Button href={url} target="_blank">site</Button>
      </MoreInfo>

    </Container>
  )
}

export default IdCard

// Move to global
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  flex-wrap: wrap;
  background-color: #ffffff;
  width: 400px;
  margin-bottom: 60px;
  margin-right: 20px;
  margin-left: 20px;
  padding-bottom: 30px;

  // justify-content: center;
  // text-align: center;
  // border-radius: 1px;
  // height: 200px;
  // padding-left: 12px;
  // padding-right: 12px;
  // border: 3px solid #F7F7FF;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const RepName = styled.h1`
  background-color: #242424;
  font-size: 1.15em;
  font-weight: 650;
  padding: 15px;
  letter-spacing: 1.35px;
  text-align: center;
  color: #ffffff;
  font-family: 'Playfair Display', serif;
  width: 80%;
  position: relative;
  top: -40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

// Move to global - one for home page and one for profile pages
// const ImageCrop = styled.div`
//   width: 143px;
//   height: 143px;
//   position: relative;
//   top: 0px;
//   margin-bottom: 15px;
//   overflow: hidden;
//   border-radius: 50%;
//   border: 1px solid #F7F7FF;
// `

// FOR BIO GUIDE
// const ImageCrop = styled.div`
//   width: 200px;
//   height: 200px;
//   position: relative;
//   top: -30px;
//   overflow: hidden;
//   border-radius: 50%;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//   background-image: url("/images/default-headshot.png");
//   background-repeat: no-repeat;
//   background-size: 150px 200px;
// `

// const Headshot = styled.img`
//   width: 100%;
//   height: auto;
// `

// FOR UNITEDSTATES.IO

const ImageCrop = styled.div`
  background-image: url("/images/default-headshot.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 180px 180px;
  width: 180px;
  height: 180px;
  position: relative;
  top: -30px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`

const Headshot = styled.img`
  width: 100%;
  height: auto;
`

const MoreInfo = styled.div`
  display:flex;
  justify-content: space-between;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  left: 50px;
  width: 330px;
`
const Heading = styled.div`
  font-weight: 650;
  text-align: left;
  width: 80px;
`
const Info = styled.div`
  text-align: left;
  width: auto;
`
