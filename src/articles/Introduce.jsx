import Lottie from "lottie-react";
import backgroundLottie from '../lotties/background.json'
import {EyesMovemetGhost}  from "../components/Ghost";
import Arrow from '../assets/arrow.svg'
import { useEffect } from "react";


export default () => {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollTo(0, window.scrollY);
    })
  })
  return (
    <article id="introduce">
        <Lottie animationData={backgroundLottie} id="background-lottie" loop={true} renderer='svg'/>
        <div>
          <section id="main-text">
              <h1>COUNTER <br/> SPELL</h1>
              
              <div>
                <h2>HACKATHON</h2>
                <i>in BUSAN</i>
              </div>
          
          </section>
          <section id="event-details">
              <b>When</b> November 23-24(SAT-SUN)<br/>
              <b>Where</b> TongMyong University, Busan<br/>
          </section>

          <section id="btns">
            <EyesMovemetGhost id="ghost-1" size={160} color={"#FFA800"}/>
            <div>
              <a href="/apply">APPLY NOW</a>
              <a href="https://dashboard.counterspellbusan.com">DASHBOARD</a>
            </div>
            <EyesMovemetGhost id="ghost-2" size={320} />
          </section>
          <section id="arrow">
            <img src={Arrow} alt="Scroll down" />
          </section>
        </div>
    </article>
  );
}