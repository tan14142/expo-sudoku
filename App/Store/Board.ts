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

const selection = {
  index: -1,
  whitelist: Array(10).fill(false),
}

const initialState: typeof cells & { selection: typeof selection } = {
  ...cells,
  selection: selection,
}

function setMistakes(board: typeof initialState) {
  for (let i = 0; i < 81; i++) {
    board[i].mistake = false
  }

  for (const row of rows) {
    if (hasDuplicateInTriplet(row.map(i => board[i].cell))) {
      row.forEach(i => (board[i].mistake = true))
    }
  }

  for (const column of columns) {
    if (hasDuplicateInTriplet(column.map(i => board[i].cell))) {
      column.forEach(i => (board[i].mistake = true))
    }
  }

  for (const region of regions) {
    const cells = region.reduce((acc, cur) => {
      board[cur].cell && acc.push(board[cur].cell)
      return acc
    }, [] as number[])

    if (cells.length > new Set(cells).size) {
      region.forEach(i => (board[i].mistake = true))
    }
  }
}

function setWhitelist(board: typeof initialState) {
  if (board[board.selection.index].init) {
    board.selection.whitelist = Array(10).fill(false)
    return
  }

  const cell = board[board.selection.index].cell
  console.log(cell)
  board.selection.whitelist = Array(10).fill(true)
  board.selection.whitelist[cell] = false
  links[board.selection.index].forEach(
    i => (board.selection.whitelist[board[i].cell] = false),
  )
}

const gameSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard(board, { payload }: PayloadAction<BoardPayload>) {
      for (let i = 0; i < 81; i++) {
        board[i] = {
          cell: payload.puzzle[i],
          init: !!payload.puzzle[i],
          mistake: false,
          selection: "",
          solution: payload.solution[i],
        }
      }
    },
    setCell(board, { payload }: PayloadAction<number>) {
      if (board.selection.index >= 0) {
        board[board.selection.index].cell = payload
        setMistakes(board)
        setWhitelist(board)
      }
    },
    setSelection(board, { payload }: PayloadAction<number>) {
      for (let i = 0; i < 81; i++) {
        if (links[payload].has(i)) {
          board[i].selection = "linked"
        } else if (board[i].cell && board[i].cell === board[payload].cell) {
          board[i].selection = "matching"
        } else if (board[i].selection) {
          board[i].selection = ""
        }
      }

      board[payload].selection = "selected"
      board.selection.index = payload
      setWhitelist(board)
    },
    reset(board) {
      for (let i = 0; i < 81; i++) {
        if (!board[i].init) board[i].cell = 0
        board[i].mistake = false
      }
    },
    solve(board) {
      for (let i = 0; i < 81; i++) {
        board[i].cell = board[i].solution
      }
    },
  },
})

export const { setBoard, setCell, setSelection, reset, solve } = gameSlice.actions
export default gameSlice.reducer
export type BoardType = typeof initialState
