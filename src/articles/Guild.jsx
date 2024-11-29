import Card from '../components/Card'
// import CardTestImage from '../card/test-image.png'
import ArtistImage from '../card/artist.png'
import HackerImage from '../card/hacker.png'
import MusicianImage from '../card/musician.png'
import { useEffect } from 'react'
import { useRef } from 'react';


export default () => {
  /**  
   * @type {React.MutableRefObject<HTMLElement>}
   */
  let guildRef = useRef(null);
  useEffect(() => {
    let obserber = new IntersectionObserver((e, p) => {
      console.log(p)
      guildRef.current.setAttribute('visible', "");
    }, {rootMargin: '0px', threshold: 0.1});
    obserber.observe(document.getElementById('guild'));
  })
  return (
    <article id="guild" ref={guildRef}>
      <div>
        <h1>CHOOSE ONE!</h1>
        <h2>FIND YOUR GUILD</h2>
        <p>
          코딩, 예술, 음악에 열정을 가진 다양한 <b>고등학생 친구들과</b><br/>
          <b>36시간 동안</b> 여러분의 창의성을 맘껏 펼쳐보세요.
        </p>
      </div>

      <div>
        <Card src={ArtistImage} />
        <Card src={HackerImage} />
        <Card src={MusicianImage} />
      </div>
    </article>
  )
}
