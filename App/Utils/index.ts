import { GameType } from "~/Store/Game"

const rows = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r * 9 + c))
const columns = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r + c * 9))
const regions = Array.from({ length: 9 }, (_, r) =>
  Array.from(
    { length: 9 },
    (_, c) => Math.floor(r / 3) * 27 + (r % 3) * 3 + Math.floor(c / 3) * 9 + (c % 3),
  ),
)

export const links = Array.from({ length: 81 }, (_, i) => {
  const row = rows[getRow(i)]
  const column = columns[getColumn(i)]
  const region = regions[getRegion(i)]
  const set = new Set([...row, ...column, ...region])
  set.delete(i)
  return set
})

export function checkRowFilled(game: GameType, row: number) {
  return rows[row].every(i => game.board[i].num === game.board[i].solution)
}

export function checkColumnFilled(game: GameType, column: number) {
  return columns[column].every(i => game.board[i].num === game.board[i].solution)
}

export function checkRegionFilled(game: GameType, region: number) {
  return regions[region].every(i => game.board[i].num === game.board[i].solution)
}

export function checkLostOrWon<EqualityFn>(_: string, nextState: string) {
  return !(nextState === "lost" || nextState === "won")
}

export function checkWon(game: GameType) {
  return game.board.every(({ num, solution }) => num === solution)
}

export function checkSelection<EqualityFn>(prevState: number, nextState: number) {
  return !(isNaN(prevState) || isNaN(nextState))
}

export function getRow(index: number) {
  return Math.floor(index / 9)
}

export function getColumn(index: number) {
  return index % 9
}

export function getRegion(index: number) {
  return Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3)
}

export function getMissing(puzzle: number[]) {
  return puzzle.reduce((acc, cur, i) => {
    if (!cur) acc.push(i)
    return acc
  }, [] as number[])
}

export function getWhitelist(puzzle: number[], index: number) {
  const whitelist = [false, true, true, true, true, true, true, true, true, true]
  links[index].forEach(link => (whitelist[puzzle[link]] = false))
  return whitelist
}

function hasDuplicateInTriplet(nums: number[]) {
  const triplets = nums.reduce(
    (acc, cur, i) => {
      cur && acc[(i / 3) | 0].add(cur)
      return acc
    },
    [new Set(), new Set(), new Set()] as Set<number>[],
  )

  const lengthBefore = triplets.reduce((acc, cur) => acc + cur.size, 0)
  const lengthAfter = triplets.reduce((acc, cur) => {
    cur.forEach(v => acc.add(v))
    return acc
  }, new Set()).size

  return lengthBefore > lengthAfter
}

export function setSolved(game: GameType, value: number) {
  if (!value) return
  game.solved[value] = game.board.reduce((acc, { num }) => acc + +(num === value), 0) === 9
}

export function setCellStatus(game: GameType, setMistakes = true) {
  game.board.forEach(({ num }, i) => {
    if (links[game.selection].has(i)) {
      game.board[i].status = "linked"
    } else if (num && num === game.board[game.selection].num) {
      game.board[i].status = "matching"
    } else {
      game.board[i].status = ""
    }
  })
  setMistakes && setStatusMistakes(game)
  game.board[game.selection].status = "selected"
}

function setStatusMistakes(game: GameType) {
  for (const i in rows) {
    if (hasDuplicateInTriplet(rows[i].map(index => game.board[index].num))) {
      rows[i].forEach(index => (game.board[index].status = "mistake"))
      game.mistakes.rows[i]++
    } else {
      game.mistakes.rows[i] = 0
    }
  }

  for (const i in columns) {
    if (hasDuplicateInTriplet(columns[i].map(index => game.board[index].num))) {
      columns[i].forEach(index => (game.board[index].status = "mistake"))
      game.mistakes.columns[i]++
    } else {
      game.mistakes.columns[i] = 0
    }
  }

  for (const i in regions) {
    const cells = regions[i].reduce((acc, index) => {
      game.board[index].num && acc.push(game.board[index].num)
      return acc
    }, [] as number[])

    if (cells.length > new Set(cells).size) {
      regions[i].forEach(index => (game.board[index].status = "mistake"))
      game.mistakes.regions[i]++
    } else {
      game.mistakes.regions[i] = 0
    }
  }
}

export function setWhitelist(game: GameType) {
  const index = game.selection

  if (game.board[index].init) {
    return
  }

  game.whitelist = getWhitelist(
    game.board.map(({ num }) => num),
    index,
  )
  const num = game.board[index].num
  game.whitelist[num] = false
}
