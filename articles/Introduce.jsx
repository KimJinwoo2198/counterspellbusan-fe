import Lottie from "lottie-react";
import backgroundLottie from '../lotties/background.json'
import {EyesMovemetGhost}  from "../components/Ghost";
import Arrow from '../assets/arrow.svg'


export default () => {
  
  return (
    <article id="introduce">
        <Lottie animationData={backgroundLottie} id="background-lottie" loop={true} renderer='svg'/>
        <div>
          <section id="main-text">
              <h1>counterspell</h1>
              <div>
              <h2>hackthon</h2>
              <i>in BUSAN</i>
              </div>
          </section>
          <section id="event-details">
              <b>When</b> November 23-24(SAT-SUN)<br/>
              <b>City</b> Busan, in Korea
          </section>

          <section id="btns">
            <EyesMovemetGhost id="ghost-1" size={160} color={"#FFA800"}/>
            <div>
              <a href="#1">apply now</a>
              <a href="#2">dashboard</a>
            </div>
            <EyesMovemetGhost id="ghost-2" size={320} />
          </section>
          <section id="arrow">
            <img src={Arrow}/>
          </section>
        </div>

    </article>
  )
}
