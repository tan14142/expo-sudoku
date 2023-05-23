import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { rows, columns, regions, links, hasDuplicateInTriplet } from "~/Utils"

interface BoardPayload {
  puzzle: number[]
  solution: number[]
}

const initialState = Array.from({ length: 81 }, (_, i) => ({
  [i]: {
    cell: 0,
    init: false,
    mistake: false,
    selection: "",
    solution: 0,
  },
})).reduce((acc, cur) => ({ ...acc, ...cur }), {})

let selectedIndex = -1

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
      if (selectedIndex >= 0) {
        board[selectedIndex].cell = payload
        setMistakes(board)
      }
    },
    setSelection(board, { payload }: PayloadAction<number>) {
      selectedIndex = payload

      for (let i = 0; i < 81; i++) {
        if (links[selectedIndex].has(i)) {
          board[i].selection = "linked"
        } else if (
          board[i].cell &&
          board[i].cell === board[selectedIndex].cell
        ) {
          board[i].selection = "matching"
        } else if (board[i].selection) {
          board[i].selection = ""
        }
      }

      board[selectedIndex].selection = "selected"
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
