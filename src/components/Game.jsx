import { useState } from 'react'
import { Board } from './Board'

export function Game ({ currentTurn, setTurn }) {
  const [cards, setCards] = useState(Array(9).fill(null))
  const [userCards, setUserCrd] = useState([])
  const [pcCards, setPcCrd] = useState([])
  const [win, setWinner] = useState(false)

  return (
    <>
      <h2>{win}</h2>
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
      <Widgets cards={userCards}>Usuario</Widgets>
      <Widgets cards={pcCards}>PC</Widgets>
    </>
  )
}

function Widgets ({ cards, children }) {
  return (
    cards.length > 0
      ? <section className='widget'>
        <h2>{children}:</h2>
        <div className='cards'>
          {
            cards.map(card => {
              return (
                <div key={card} className="card">
                  {card + 1}
                </div>
              )
            })
          }
        </div>
      </section>
      : null
  )
}
