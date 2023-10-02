import { I_CARDS } from '../assets/dictionary'

// Funcioon que evalua si hay un ganador
export function checkWin (game) {
  // Evalua todas las posibles combinaciones ganadoras que contengan
  // el centro del tablero
  if (game[4]) {
    for (let i = 4; i > 0; i--) {
      if (game[4] === game[4 - i] && game[4] === game[4 + i]) return game[4]
    }
  }
  // Evalua todas las posible combinaciones ganadoras que contengan los extremos izquierdo y superior del tablero
  if (game[0] && (
    (game[0] === game[1] && game[1] === game[2]) ||
      (game[0] === game[3] && game[3] === game[6])
  )) return game[0]
  // Evalua todas las posible combinaciones ganadoras que contenga los lados derecho e inferior del tablero
  if (game[8] && (
    (game[8] === game[2] && game[8] === game[5]) ||
      (game[8] === game[6] && game[8] === game[7])
  )) return game[8]
  // En caso de que todo el tablero se encuentre ocupado sin un ganador
  // retorna 1 definiendo como empate el juego
  if (!game.includes(null)) return 1
  return false
}

// Retorna un areglo de las posiciones donde se encuentra un elemento
export function getValues (match, turn) {
  const value = []
  match.forEach((val, index) => {
    if (val === turn) value.push(index)
  })
  return value
}

// Funcion que adapta los valores de los indices de un arreglo de 9
// posiciones a un arreglo que cuando se genera una configuración de
// un cuadrado de 3x3 cualquier suma de 3 numeros que formen una linea
// recta en el cuadrado de como resultado 12, ésto debido a que los numeros
// manejados son los indices del arreglo original, sin embargo, la
// numeracion en el juego es del 1 - 9, dando en todos los casos una suma con
// resultado 15, es decir:
// 7 0 5     8 1 6
// 2 4 6  y  3 5 7
// 3 8 1     4 9 2
export function adapterCards (match) {
  const values = Array(9).fill(null)
  // I_CARDS contiene los indices equivalentes
  I_CARDS.forEach((position, index) => {
    values.splice(position, 1, match[index])
  })
  return values
}
