import { useEffect } from 'react'
import { AD_CARDS, TURNS } from '../assets/dictionary'
import { getValues, checkWin, adapterCards } from '../utils/utils'
import { movePC } from '../model/movePC'

export function Board ({ cards, setCards, setUserCrd, setPcCrd, turn, setTurn, win, setWinner }) {
  useEffect(() => {
    if (turn === TURNS.User || win) return
    const copyBoard = [...cards]
    const machineMove = movePC({ match: adapterCards(cards) })
    copyBoard[AD_CARDS[machineMove]] = TURNS.Machine
    setCards(copyBoard)
    setPcCrd(getValues(copyBoard, TURNS.Machine))
    const isWin = checkWin(adapterCards(copyBoard))
    if (isWin === 1) setWinner(1)
    isWin ? setWinner(isWin) : setTurn(TURNS.User)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, win])

  function selectCard (index) {
    if (turn === TURNS.Machine || win) return
    const copyBoard = [...cards]
    copyBoard[index] = TURNS.User
    setCards(copyBoard)
    setUserCrd(getValues(copyBoard, TURNS.User))
    const isWin = checkWin(adapterCards(copyBoard))
    if (isWin === 1) return setWinner(1)
    isWin ? setWinner(isWin) : setTurn(TURNS.Machine)
  }

  return (
    <section className='widget'>
      <h2>Cartas Disponibles:</h2>
      <div className='cards'>
        {
          cards.map((card, index) => {
            return (
              !card
                ? <div
                key={index}
                className="card hv"
                onClick = {() => { selectCard(index) }}
                >
                  {index + 1}
                </div>
                : null
            )
          })
        }
      </div>
    </section>
  )
}
