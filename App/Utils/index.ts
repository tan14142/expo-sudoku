import { GameType } from "~/Store/Game"

const rows = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r * 9 + c))
const columns = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r + c * 9))
const regions = Array.from({ length: 9 }, (_, r) =>
  Array.from(
    { length: 9 },
    (_, c) => Math.floor(r / 3) * 27 + (r % 3) * 3 + Math.floor(c / 3) * 9 + (c % 3),
  ),
)

export function checkWon(game: GameType) {
  return game.board.every(({ num, solution }) => num === solution)
}

export function checkLostOrWon<EqualityFn>(_: string, nextState: string) {
  return !(nextState === "lost" || nextState === "won")
}

export function checkSelection<EqualityFn>(prevState: number, nextState: number) {
  return !(isNaN(prevState) && !isNaN(nextState))
}

export const links = Array.from({ length: 81 }, (_, i) => {
  const row = rows[Math.floor(i / 9)]
  const column = columns[i % 9]
  const region = regions[Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3)]
  const set = new Set([...row, ...column, ...region])
  set.delete(i)
  return set
})

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

export function getMatchedCountAndSetLinked(game: GameType) {
  let count = 0

  game.board.forEach(({ num, status }, i) => {
    if (links[game.selection].has(i)) {
      game.board[i].status = "linked"
    } else if (num && num === game.board[game.selection].num) {
      game.board[i].status = "matching"
      count++
    } else if (status) {
      game.board[i].status = ""
    }
  })

  game.board[game.selection].status = "selected"
  return count
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

export function setMistakes(game: GameType) {
  game.board.forEach((_, i) => {
    game.board[i].mistake = false
  })

  for (const row of rows) {
    if (hasDuplicateInTriplet(row.map(i => game.board[i].num))) {
      row.forEach(i => (game.board[i].mistake = true))
    }
  }

  for (const column of columns) {
    if (hasDuplicateInTriplet(column.map(i => game.board[i].num))) {
      column.forEach(i => (game.board[i].mistake = true))
    }
  }

  for (const region of regions) {
    const cells = region.reduce((acc, i) => {
      game.board[i].num && acc.push(game.board[i].num)
      return acc
    }, [] as number[])

    if (cells.length > new Set(cells).size) {
      region.forEach(i => (game.board[i].mistake = true))
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
