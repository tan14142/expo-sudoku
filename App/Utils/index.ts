import { BoardType } from "~/Store/Board"

const rows = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r * 9 + c))
const columns = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r + c * 9))
const regions = Array.from({ length: 9 }, (_, r) =>
  Array.from(
    { length: 9 },
    (_, c) => Math.floor(r / 3) * 27 + (r % 3) * 3 + Math.floor(c / 3) * 9 + (c % 3),
  ),
)

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

export function getMatchedCountAndSetLinked(board: BoardType) {
  let count = 0

  board.cells.forEach(({ cell, selection }, i) => {
    if (links[board.selection.index].has(i)) {
      board.cells[i].selection = "linked"
    } else if (cell && cell === board.cells[board.selection.index].cell) {
      board.cells[i].selection = "matching"
      count++
    } else if (selection) {
      board.cells[i].selection = ""
    }
  })

  board.cells[board.selection.index].selection = "selected"
  return count
}

export function setMistakes(board: BoardType) {
  board.cells.forEach((_, i) => {
    board.cells[i].mistake = false
  })

  for (const row of rows) {
    if (hasDuplicateInTriplet(row.map(i => board.cells[i].cell))) {
      row.forEach(i => (board.cells[i].mistake = true))
    }
  }

  for (const column of columns) {
    if (hasDuplicateInTriplet(column.map(i => board.cells[i].cell))) {
      column.forEach(i => (board.cells[i].mistake = true))
    }
  }

  for (const region of regions) {
    const cells = region.reduce((acc, i) => {
      board.cells[i].cell && acc.push(board.cells[i].cell)
      return acc
    }, [] as number[])

    if (cells.length > new Set(cells).size) {
      region.forEach(i => (board.cells[i].mistake = true))
    }
  }
}

export function setWhitelist(board: BoardType) {
  const index = board.selection.index

  if (board.cells[index].init) {
    return
  }

  board.selection.whitelist = getWhitelist(
    board.cells.map(({ cell }) => cell),
    index,
  )
  const cell = board.cells[index].cell
  board.selection.whitelist[cell] = false
}
