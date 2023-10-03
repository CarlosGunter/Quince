// CHAVEZ ORTIZ SAUL DAVID
// GUTIERREZ TREJO CARLOS ALBERTO
// SALAZAR HERMOSILLO ALAM ABEL

import { useState, useRef } from 'react'
import { Game } from './components/Game'
import { Create } from './components/Create'
import './App.css'

function App () {
  // Estado del turno
  const [currentTurn, setTurn] = useState()
  // Guarda el primer turno que seleccionó el usuario
  const firstTurn = useRef()
  // Estado que define si el usuari ya eligio simbolo y turno
  const [start, setStart] = useState()
  return (
    <main className='main'>
      <header>
        <h1 className='title'>Junta 15</h1>
      </header>
      {
        start
          ? <Game
          currentTurn={currentTurn}
          setTurn={setTurn}
          firstTurn={firstTurn}
          setStart={setStart}
          ></Game>
          : <Create turn={currentTurn} setTurn={setTurn} firstTurn={firstTurn} setStart={setStart} ></Create>
      }
    </main>
  )
}
export default App
