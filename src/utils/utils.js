import { I_CARDS } from '../assets/dictionary'

export function checkWin (match) {
  if (match[4]) {
    for (let i = 4; i > 0; i--) {
      if (match[4] === match[4 - i] && match[4] === match[4 + i]) return match[4]
    }
  }
  if (match[0] && (
    (match[0] === match[1] && match[1] === match[2]) ||
    (match[0] === match[3] && match[3] === match[6])
  )) return match[0]
  if (match[8] && (
    (match[8] === match[2] && match[8] === match[5]) ||
    (match[8] === match[6] && match[8] === match[7])
  )) return match[8]
  if (!match.includes(null)) return 1
  return false
}

export function getValues (match, turn) {
  const value = []
  match.forEach((val, index) => {
    if (val === turn) value.push(index)
  })
  return value
}

export function adapterCards (match) {
  const values = Array(9).fill(null)
  I_CARDS.forEach((position, index) => {
    values.splice(position, 1, match[index])
  })
  return values
}
