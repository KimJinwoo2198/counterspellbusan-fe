import Lottie from 'lottie-react';
import { useState, useEffect, useRef } from 'react';
import PacmanLottie from '../lotties/pacman.json';
import { EyesMovemetGhost } from '../components/Ghost';
const targetDate = new Date("2024-11-23T00:00:00").getTime();

export default function CountdownTimer() {
  const [playLevel, setPlayLevel] = useState(0.0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [serverTimeOffset, setServerTimeOffset] = useState(0.0);
  const requestRef = useRef();

  useEffect(() => {
      const handleScroll = () => {
        const element = document.getElementById('pac-anime');
        if (element) {
          const rect = element?.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const visiblePercentage = Math.min(Math.max((windowHeight - windowHeight/2 - rect.top) / windowHeight, 0), 1);
          setPlayLevel(Math.max(visiblePercentage*100, 0.01));
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };

  }, []);

  const fetchServerTime = async () => {
    try {
      const fetchStart = new Date().getTime();
      const response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Seoul");
      const data = await response.json();
      const fetchEnd = new Date().getTime();

      const serverNow = new Date(data.datetime).getTime();
      const latency = (fetchEnd - fetchStart) / 2;
      const adjustedServerNow = serverNow + latency;
      const localNow = new Date().getTime();

      setServerTimeOffset(adjustedServerNow - localNow);
    } catch (error) {
      console.error("Failed to fetch server time", error);
    }
  };  

  const calculateTimeLeft = () => {
    const now = new Date().getTime() + serverTimeOffset;
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  const tick = () => {
    calculateTimeLeft();
    requestRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    fetchServerTime();
    requestRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(requestRef.current);
  }, [serverTimeOffset]);

  return (
    <article id="count-down">
      <section id="ghosts">
        <EyesMovemetGhost id="ghost-1" size={240} color={"#FF4186"}/>
        <EyesMovemetGhost id="ghost-2" size={180} color={"#41DDFF"}/>
      </section>
      <h1>We start in...</h1>
      <div id="timer">
        <div className="timer-item">
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <p>days</p>
        </div>
        <p>:</p>
        <div className="timer-item">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <p>hours</p>
        </div>
        <p>:</p>
        <div className="timer-item">
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <p>minutes</p>
        </div>
        <p>:</p>
        <div className="timer-item">
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <p>seconds</p>
        </div>
      </div>
      <Lottie animationData={PacmanLottie} loop={false} id="pac-anime" initialSegment={[playLevel, playLevel]}/>
    </article>
  );
}