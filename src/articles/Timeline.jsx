import React from 'react';
import Timeline from '../assets/timeline.svg';
import { EyesMovemetGhost } from "../components/Ghost";

export default () => {
  return (
    <article id="timeline">
        <h1>TIMELINE</h1>
        <div id="img">
          <img src={Timeline} />
        </div>
        <section>
            <div class="tl">
                <div id="bar"></div>
                <div id="scadules">
                  <Scadule time="9 : 00 - 10 : 00" title="Registration & Opening" color="#C3CBDE" />
                  <Scadule time="10 : 00 - 12 : 00" title="Team Building & Networking" color="#FF4186" />
                  <Scadule time="12 : 00 - 13 : 00" title="Lunch" color="#41DDFF" />
                  <Scadule time="13 : 00 - 16 : 00" title="HackTime & Lecture" color="#FF4186" />
                  <Scadule time="16 : 00 - 17 : 00" title="Idea Mentoring" color="#FF4186" />
                  <Scadule time="17 : 00 - 18 : 00" title="HackTime" color="#FF4186" />
                  <Scadule time="18 : 00 - 19 : 00" title="Dinner" color="#41DDFF" />
                  <Scadule time="19 : 00 - 21 : 00" title="Code Mentoring" color="#FF4186" />
                  <Scadule time="21 : 00 - 24 : 00" title="HackTime (Dawn Sprint)" color="#FF4186" />
                </div>
            </div>

            <div class="tl">
                <div id="bar"></div>
                <div id="scadules">
                  <Scadule time="00 : 00 - 03 : 00" title="Registration & Opening" color="#FF4186" />
                  <Scadule time="03 : 00 - 09 : 00" title="Team Building & Networking" color="#FF4186" />
                  <Scadule time="09 : 00 - 10 : 00" title="Lunch" color="#41DDFF" />
                  <Scadule time="10 : 00 - 12 : 00" title="HackTime & Lecture" color="#FF4186" />
                  <Scadule time="12 : 00 - 13 : 00" title="Idea Mentoring" color="#41DDFF" />
                  <Scadule time="13 : 00 - 16 : 00" title="HackTime" color="#FF4186" />
                  <Scadule time="16 : 00 - 17 : 00" title="Dinner" color="#FF4186" />
                  <Scadule time="17 : 00 - 18 : 00" title="Code Mentoring" color="#C3CBDE" />
                </div>
            </div>
        </section>
        <div style={{marginBottom: 100}}></div>
    </article>
  );
};

/**
 * @param {object} param0
 * @param {string} param0.time
 * @param {string} param0.title
 * @param {string} param0.content 
 * @param {"#FF4186" | "#41DDFF" | "#C3CBDE"} param0.color
 */
function Scadule({time, title, content, color}) {
  return (
    <div class="scadule">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect width="16" height="16" rx="8" fill={color}/>
        <circle cx="8" cy="8" r="4" fill="white" fill-opacity="0.8"/>
      </svg>
      <div>
        <p>{time}</p>
        <h1>{title}</h1>
        <h2>{content}</h2>
      </div>
    </div>
  );
}