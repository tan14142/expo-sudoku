import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  getMatchedCountAndSetLinked,
  getWhitelist,
  links,
  setMistakes,
  setWhitelist,
} from "~/Utils"
import { EventType, getEvent, pushEvent, pushEvents } from "~/Utils/events"

type BoardPayloadType = {
  puzzle: number[]
  solution: number[]
}

const cells = Array.from({ length: 81 }, () => ({
  init: false,
  mistake: false,
  notes: Array<boolean>(10).fill(false),
  num: 0,
  selection: "",
  solution: 0,
}))

const initialState = {
  cells: cells,
  events: [] as EventType[][],
  noteWrite: true,
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
    setBoard(board, { payload }: PayloadAction<BoardPayloadType>) {
      const solved = Array<number>(10).fill(0)

      board.cells = board.cells.map((_, i) => {
        solved[payload.puzzle[i]]++

        return {
          init: !!payload.puzzle[i],
          mistake: false,
          notes: Array(10).fill(false),
          num: payload.puzzle[i],
          selection: "",
          solution: payload.solution[i],
        }
      })

      board.events = []
      board.solved = solved.map(v => v === 9)
    },
    setNote(board, { payload }: PayloadAction<number>) {
      const { index } = board.selection
      pushEvent(board, index)
      board.cells[index].num = 0
      board.cells[index].notes[payload] = !board.cells[index].notes[payload]
    },
    setNoteSwipe(board, { payload }: PayloadAction<number>) {
      if (board.selection.index === -1 || board.cells[payload].init || board.cells[payload].num) {
        return
      }

      const { num } = board.cells[board.selection.index]

      if (
        num === 0 ||
        !getWhitelist(
          board.cells.map(({ num }) => num),
          payload,
        )[num]
      ) {
        return
      }

      board.cells[payload].num = 0
      board.cells[payload].notes[num] = board.noteWrite
    },
    setNoteSwipeStart(board, { payload }: PayloadAction<number>) {
      if (board.selection.index === -1) {
        return
      }

      pushEvents(
        board,
        Array.from({ length: 81 }, (_, i) => i),
      )
      const { num } = board.cells[board.selection.index]
      board.noteWrite = !board.cells[payload].notes[num]
    },
    removeNotes(board) {
      links[board.selection.index].forEach(link => {
        board.events[board.events.length - 1].push(getEvent(board, link))
        board.cells[link].notes[board.cells[board.selection.index].num] = false
      })
    },
    setNum(board, { payload }: PayloadAction<number>) {
      if (board.selection.index === -1) {
        return
      }

      pushEvent(board, board.selection.index)
      board.solved[board.cells[board.selection.index].num] = false
      board.cells[board.selection.index].notes = Array(10).fill(false)
      board.cells[board.selection.index].num = payload
      setMistakes(board)
      setWhitelist(board)

      if (payload) {
        board.solved[payload] = getMatchedCountAndSetLinked(board) === 9
      }
    },
    setSelection(board, { payload }: PayloadAction<number>) {
      board.events.pop()

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
    hint(board) {
      if (board.selection.index === -1 || board.cells[board.selection.index].init) {
        return
      }

      boardSlice.caseReducers.setNum(board, {
        payload: board.cells[board.selection.index].solution,
        type: "board/setNum",
      })

      board.cells[board.selection.index].init = true
      board.events = []
    },
    reset(board) {
      board.cells.forEach(({ init }, i) => {
        if (!init) board.cells[i].num = 0
        board.cells[i].mistake = false
        board.cells[i].notes = Array(10).fill(false)
      })
      board.events = []
    },
    solve(board) {
      board.cells.forEach(({ solution }, i) => {
        board.cells[i].num = solution
      })
      board.events = []
    },
    undo(board) {
      if (board.events.length) {
        board.events.pop()!.forEach(({ index, notes, num }) => {
          board.cells[index].notes = notes
          board.cells[index].num = num
        })

        setMistakes(board)
        setWhitelist(board)
      }
    },
  },
})

export const {
  setBoard,
  setNote,
  setNoteSwipe,
  setNoteSwipeStart,
  removeNotes,
  setNum,
  setSelection,
  clear,
  hint,
  reset,
  solve,
  undo,
} = boardSlice.actions
export default boardSlice.reducer
export type BoardType = typeof initialState
