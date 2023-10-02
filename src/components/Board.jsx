import { useEffect } from 'react'
import { AD_CARDS, TURNS } from '../assets/dictionary'
import { getValues, checkWin, adapterCards } from '../utils/utils'
import { movePC } from '../model/movePC'

export function Board ({ cards, setCards, setUserCrd, setPcCrd, turn, setTurn, win, setWinner }) {
  // Bloque de codigo que define cuando la computadora le toca hacer
  // su movimiento
  useEffect(() => {
    // En caso de ser turno del usuario o ya existe un ganador no jecuta nada
    if (turn === TURNS.User || win) return
    setTimeout(() => {
      const copyBoard = [...cards]
      // Se invoca la funcion donde se define el movimiento de la computadora
      // Se envia como parametro un adaptador de las posiciones de los numeros
      // adapterCards() se encuentra en src/utils/utils.js
      const machineMove = movePC({ match: adapterCards(cards) })
      // Se transforma el movimiento de la computadora al formato de indices
      // consecutivos a travez de AD_CARDS
      copyBoard[AD_CARDS[machineMove]] = TURNS.Machine
      // Se actualiza el estado del juego
      setCards(copyBoard)
      setPcCrd(getValues(copyBoard, TURNS.Machine))
      // Se evalua si hay un ganador utilizando el adaptador
      const isWin = checkWin(adapterCards(copyBoard))
      if (isWin === 1) setWinner(1) // Se evalua y define si hay empate
      // En caso de que un jugador gane se actualiza el estado ganador
      // caso contrario se le transfiere el turno al usuario
      isWin ? setWinner(isWin) : setTurn(TURNS.User)
    }, 500) // El movimiento de la computadora tiene un delay de 500 ms
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, win]) // Se ejecuta cada vez que un Turno y el ganador cambie

  // Se ejecuta cuando el usuarioo hace click en una casilla
  function selectCard (index) {
    // Si es turno de la computadora, o hay un ganador no se ejecuta nada
    if (turn === TURNS.Machine || win) return
    const copyBoard = [...cards]
    copyBoard[index] = TURNS.User
    // Se actualiza estado del juego
    setCards(copyBoard)
    setUserCrd(getValues(copyBoard, TURNS.User))
    // Se evalua si hay un ganador
    const isWin = checkWin(adapterCards(copyBoard))
    if (isWin === 1) return setWinner(1) // Se evalua y define si hay empate
    // En caso de que un jugador gane se actualiza el estado ganador
    // caso contrario se le transfiere el turno al la computadora
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
                className="card hv scale-in-center"
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
