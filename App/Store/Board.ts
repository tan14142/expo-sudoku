import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  getMatchedCountAndSetLinked,
  getWhitelist,
  links,
  setMistakes,
  setWhitelist,
} from "~/Utils"

interface BoardPayload {
  puzzle: number[]
  solution: number[]
}

const cells = Array.from({ length: 81 }, () => ({
  cell: 0,
  init: false,
  mistake: false,
  notes: Array(10).fill(false),
  selection: "",
  solution: 0,
}))

const initialState = {
  cells: cells,
  noteStart: true,
  selection: {
    index: -1,
    whitelist: Array(10).fill(false) as boolean[],
  },
  solved: Array(10).fill(false) as boolean[],
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard(board, { payload }: PayloadAction<BoardPayload>) {
      const solved = Array(10).fill(0)

      board.cells = board.cells.map((_, i) => {
        solved[payload.puzzle[i]]++

        return {
          cell: payload.puzzle[i],
          init: !!payload.puzzle[i],
          mistake: false,
          notes: Array(10).fill(false),
          selection: "",
          solution: payload.solution[i],
        }
      })

      board.solved = solved.map(v => v === 9)
    },
    setNote(board, { payload }: PayloadAction<number>) {
      if (board.selection.index === -1) {
        return
      }

      const num = board.cells[board.selection.index].cell

      if (num < 1 || board.cells[payload].init) {
        return
      }

      if (
        !getWhitelist(
          board.cells.map(({ cell }) => cell),
          payload,
        )[num]
      ) {
        return
      }

      board.cells[payload].cell = 0
      board.cells[payload].notes[num] = board.noteStart
    },
    setNoteStart(board, { payload }: PayloadAction<number>) {
      if (board.selection.index === -1) {
        return
      }

      const num = board.cells[board.selection.index].cell
      board.noteStart = !board.cells[payload].notes[num]
    },
    removeNotes(board) {
      const num = board.cells[board.selection.index].cell
      links[board.selection.index].forEach(link => (board.cells[link].notes[num] = false))
    },
    setNum(board, { payload }: PayloadAction<number>) {
      if (board.selection.index === -1) {
        return
      }

      board.solved[board.cells[board.selection.index].cell] = false
      board.cells[board.selection.index].cell = payload
      setMistakes(board)
      setWhitelist(board)

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
    clear(board) {
      if (board.selection.index === -1) {
        return
      }

      boardSlice.caseReducers.setNum(board, {
        payload: 0,
        type: "board/setNum",
      })
      board.cells[board.selection.index].notes = Array(10).fill(false)
    },
    reset(board) {
      board.cells.forEach(({ init }, i) => {
        if (!init) board.cells[i].cell = 0
        board.cells[i].mistake = false
        board.cells[i].notes = Array(10).fill(false)
      })
    },
    solve(board) {
      board.cells.forEach(({ solution }, i) => {
        board.cells[i].cell = solution
      })
    },
  },
})

export const {
  setBoard,
  setNote,
  setNoteStart,
  removeNotes,
  setNum,
  setSelection,
  clear,
  reset,
  solve,
} = boardSlice.actions
export default boardSlice.reducer
export type BoardType = typeof initialState
