import React, { useState, useEffect } from 'react'
import Introduce from '../articles/Introduce'
import CountDown from '../articles/CountDown'
import Guild from '../articles/Guild'
import Info from '../articles/Info'
import Fqa from '../articles/Faq'
import Sponsor from '../articles/Sponsor'
import MoreInfo from '../articles/MoreInfo'
import LogoSvg from '../assets/logo.svg'
// import JoinUs from '../components/JoinUs'
import Timeline from '../articles/Timeline'
export default () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  return (
    <>
      <main>
        <Introduce/>
        <CountDown/>
        <Info/>
        <Guild/>
        <Timeline/>
        <Fqa/>
        <Sponsor/>
        <MoreInfo/>
      </main>
    </>
  )
}