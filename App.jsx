import Introduce from './articles/Introduce'
import CountDown from './articles/CountDown'
import Guild from './articles/Guild'
import Info from './articles/Info'
import Fqa from './articles/Fqa'
import Pacdown from './assets/pacdown.svg'
import Sponsor from './articles/Sponsor'
import MoreInfo from './articles/MoreInfo'

function App() {
  return (
    <main>
      <Introduce />
      <CountDown/>
      <img src={Pacdown} id="pacdown"/>
      <Info/>
      <Guild/>
      <Fqa/>
      <Sponsor/>
      <MoreInfo/>
    </main>
  )
}

export default App
