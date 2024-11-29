import Card from '../components/Card'
import CardTestImage from '../card/test-image.png'


export default () => {
  return (
    <article id="guild">
      <div>
        <h1>choose one</h1>
        <h2>find your guild</h2>
        <p>
          코딩, 예술, 음악에 열정을 가진 다양한 <b>고등학생 친구들과</b><br/>
          <b>36시간 동안</b> 여러분의 창의성을 맘껏 펼쳐보세요.
        </p>
      </div>

      <div>
        <Card src={CardTestImage} />
        <Card src={CardTestImage} />
        <Card src={CardTestImage} />
      </div>
    </article>
  )
}
