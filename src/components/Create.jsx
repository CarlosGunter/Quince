import { TURNS } from '../assets/dictionary.js'
import { User, Machine } from '../assets/svg.jsx'

export function Create ({ turn, setTurn, firstTurn, setStart }) {
  const start = () => {
    if (turn) setStart(true)
  }
  return (
    <section>
      <h2>¿Quién iniciará la partida?</h2>
      <div className='turn'>
        <div className="cell_turn hv"
        onClick={() => {
          firstTurn.current = TURNS.User
          setTurn(TURNS.User)
        }}>
          <User></User>
        </div>
        <div className="cell_turn hv"
        onClick={() => {
          firstTurn.current = TURNS.Machine
          setTurn(TURNS.Machine)
        }}>
          <Machine></Machine>
        </div>
      </div>
      <button className='button' onClick={() => { start() }}>Iniciar</button>
    </section>
  )
}
