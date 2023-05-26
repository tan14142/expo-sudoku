import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { rows, columns, regions, links, hasDuplicateInTriplet } from "~/Utils"

interface BoardPayload {
  puzzle: number[]
  solution: number[]
}

const cells = Array.from({ length: 81 }, (_, i) => ({
  [i]: {
    cell: 0,
    init: false,
    mistake: false,
    selection: "",
    solution: 0,
  },
})).reduce((acc, cur) => ({ ...acc, ...cur }), {})

const initialState = {
  cells: cells,
  selection: {
    index: -1,
    cell: 0,
    whitelist: Array(10).fill(false) as boolean[],
  },
  solved: Array(10).fill(false) as boolean[],
}

function setMistakes(board: typeof initialState) {
  for (let i = 0; i < 81; i++) {
    board.cells[i].mistake = false
  }

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

function setWhitelist(board: typeof initialState) {
  if (board.cells[board.selection.index].init) {
    board.selection.whitelist = Array(10).fill(false)
    return
  }

  const cell = board.cells[board.selection.index].cell
  board.selection.whitelist = Array(10).fill(true)
  board.selection.whitelist[cell] = false
  links[board.selection.index].forEach(
    i => (board.selection.whitelist[board.cells[i].cell] = false),
  )
}

function getMatchedCountAndSetLinked(board: typeof initialState) {
  let count = 0

  for (let i = 0; i < 81; i++) {
    if (links[board.selection.index].has(i)) {
      board.cells[i].selection = "linked"
    } else if (
      board.cells[i].cell &&
      board.cells[i].cell === board.cells[board.selection.index].cell
    ) {
      board.cells[i].selection = "matching"
      count++
    } else if (board.cells[i].selection) {
      board.cells[i].selection = ""
    }
  }

  board.cells[board.selection.index].selection = "selected"
  return count
}

const gameSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard(board, { payload }: PayloadAction<BoardPayload>) {
      const solved = Array(10).fill(0)

      for (let i = 0; i < 81; i++) {
        board.cells[i] = {
          cell: payload.puzzle[i],
          init: !!payload.puzzle[i],
          mistake: false,
          selection: "",
          solution: payload.solution[i],
        }
        solved[payload.puzzle[i]]++
      }

      board.solved = solved.map(v => v === 9)
    },
    setCell(board, { payload }: PayloadAction<number>) {
      board.solved[board.cells[board.selection.index].cell] = false

      if (board.selection.index >= 0) {
        board.cells[board.selection.index].cell = payload
        setMistakes(board)
        setWhitelist(board)
      }

      if (payload) {
        board.solved[payload] = getMatchedCountAndSetLinked(board) === 9
      }
    },
    setSelection(board, { payload }: PayloadAction<number>) {
      if (board.selection.index !== payload) {
        board.selection.index = payload
        getMatchedCountAndSetLinked(board)
        setWhitelist(board)
      }
    },
    reset(board) {
      for (let i = 0; i < 81; i++) {
        if (!board.cells[i].init) board.cells[i].cell = 0
        board.cells[i].mistake = false
      }
    },
    solve(board) {
      for (let i = 0; i < 81; i++) {
        board.cells[i].cell = board.cells[i].solution
      }
    },
  },
})
// TODO: use board.cells to write array functions
export const { setBoard, setCell, setSelection, reset, solve } = gameSlice.actions
export default gameSlice.reducer
export type BoardType = typeof initialState
