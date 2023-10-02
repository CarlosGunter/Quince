import { useState } from 'react'
import { Board } from './Board'
import { useStadistics } from '../hooks/useStadistics'
import { TURNS } from '../assets/dictionary'
import { User, Machine } from '../assets/svg'

export function Game ({ currentTurn, setTurn, firstTurn, setStart }) {
  // Estado de los numeros disponibles
  const [cards, setCards] = useState(Array(9).fill(null))
  // Estado de los numeros del usuario
  const [userCards, setUserCrd] = useState([])
  // Estado de los numeros de la computadora
  const [pcCards, setPcCrd] = useState([])
  // Estado que define si ha un ganador, si es empate el estado es 1
  const [win, setWinner] = useState(false)
  // Se obtiene el listado de partidas jugadas
  const metrics = useStadistics(win)

  // Se ejecuta al darle al boton 'Ir al inicio', se resetea el Turno y
  // el símbolo, obligando al usuario a seleccionar ambos de nuevo
  const reload = () => {
    setTurn(false)
    setStart(false)
  }

  // Se ejecuta al hacer click en el botón 'Reiniciar', todos los numeros
  // estarán disponibles, y el ganador y el turno se define al primero que
  // se selecciono al iniciar la primer partida
  const reset = () => {
    setCards(Array(9).fill(null))
    setUserCrd([])
    setPcCrd([])
    setWinner(false)
    setTurn(firstTurn.current)
  }

  return (
    <>
      <div className='boxes'>
        <Board
        cards={cards}
        setCards={setCards}
        setUserCrd={setUserCrd}
        setPcCrd={setPcCrd}
        turn={currentTurn}
        setTurn={setTurn}
        win={win}
        setWinner={setWinner}
        ></Board>
        <div className=' boxes usr_pc'>
          <Widgets cards={userCards}>Usuario</Widgets>
          <Widgets cards={pcCards}>PC</Widgets>
        </div>
      </div>

      <TURN win={win} currentTurn={currentTurn} >Tu Turno!</TURN>

      <div className='stadistics'>
        <p className='block'>Juegos: {metrics.plays}</p>
        <p className='block'>Ganaste: {metrics.won}</p>
        <p className='block'>Perdiste: {metrics.loose}</p>
      </div>

      <div className='buttons'>
        <button className='button' onClick={() => reload()}>Ir al inicio</button>
        <button className='button' onClick={() => reset()}>Reiniciar</button>
      </div>
    </>
  )
}

// Imprime los recuadros de los numeros que poseen los jugadores
function Widgets ({ cards, children }) {
  return (
    <section className='widget'>
      <h2>{children}:</h2>
      <div className='cards'>
        {
          cards.map(card => {
            return (
              <div key={card} className="card scale-in-center">
                {card + 1}
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

// Componente donde se muestra durante la partida 'Tu turno', si la fuente
// se muestra en blanco es turno del usuario, si se muestra gris el turno
// es de la computadora
// En caso de haber un ganador o un empate cambia la leyenda correspondiente
function TURN ({ win, currentTurn }) {
  const printWin = (turn) => {
    if (turn === TURNS.User) return <User></User>
    if (turn === TURNS.Machine) return <Machine></Machine>
  }
  let winner
  if (win && win === 1) {
    winner = 'Empate!' // Cambia la leyenda a 'Empate'
  } else winner = 'Ganó: ' // Cambia la leyenda a un ganador
  if (!win) winner = 'Tu turno!' // Cambia la leyenda a 'Tu turno'
  return (
    <section className='admin'>
      <h2 className={currentTurn === TURNS.Machine && !win ? 'machine_turn' : '' + 'title'}>{winner}</h2>

      {
        win && win !== 1
          ? printWin(currentTurn) // Imprime al ganador
          : ''
      }
    </section>
  )
}
