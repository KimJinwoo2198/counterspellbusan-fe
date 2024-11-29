import {EyesMovemetGhost} from "../components/Ghost"

export default () => {
  return (
    <article id="info">
      <div>
        <h1>MAKE GAME,</h1>
        <h2>MEET COOL PEOPLE</h2>
        <p>
          카운터스펠은 Hack Club의 가장 큰 글로벌 이벤트 중 하나로,<br/>
          <b>전 세계 300개 이상의 장소에서 동시에</b> 열리는 대규모 해커톤입니다.
        </p>

        <EyesMovemetGhost id="ghost-3" size={200} color={"#41DDFF"}/>
      </div>
    </article>
  )
}

