import { useState, useRef } from 'react'
import { Game } from './components/Game'
import { Create } from './components/Create'
import './App.css'

function App () {
  const [currentTurn, setTurn] = useState()
  const firstTurn = useRef()
  const [start, setStart] = useState()
  return (
    start
      ? <Game
      currentTurn={currentTurn}
      setTurn={setTurn}
      ></Game>
      : <Create turn={currentTurn} setTurn={setTurn} firstTurn={firstTurn} setStart={setStart} ></Create>
  )
}
export default App
