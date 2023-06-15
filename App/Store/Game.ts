import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  links,
  checkRowFilled,
  checkColumnFilled,
  checkRegionFilled,
  checkWon,
  getRow,
  getColumn,
  getRegion,
  getWhitelist,
  setSolved,
  setCellStatus,
  setWhitelist,
} from "~/Utils"
import { game as initialState } from "~/Store/initialState"
import { GameEvent } from "~/Types"

type BoardPayload = {
  difficulty: string
  puzzle: number[]
  solution: number[]
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    pushBoard(game) {
      game.events.push(game.board.map((_, i) => getEvent(game, i)))
    },
    pushLinks(game) {
      links[game.selection].forEach(link => {
        game.events[game.events.length - 1].push(getEvent(game, link))
      })
    },
    pushSelection(game) {
      game.events.push([getEvent(game, game.selection)])
    },
    setBoard(game, { payload }: PayloadAction<BoardPayload>) {
      game.board = game.board.map((_, i) => {
        return {
          init: !!payload.puzzle[i],
          notes: Array(10).fill(false),
          num: payload.puzzle[i],
          status: "",
          solution: payload.solution[i],
        }
      })
      game.difficulty = payload.difficulty
    },
    setNote(game, { payload }: PayloadAction<number>) {
      game.board[game.selection].num = 0
      game.board[game.selection].notes[payload] = !game.board[game.selection].notes[payload]
    },
    setNotesSwipe(game, { payload }: PayloadAction<number>) {
      if (game.board[payload].init || game.board[payload].num) {
        return
      }

      const { num } = game.board[game.selection]

      if (
        num === 0 ||
        !getWhitelist(
          game.board.map(({ num }) => num),
          payload,
        )[num]
      ) {
        return
      }

      game.board[payload].num = 0
      game.board[payload].notes[num] = notesWrite
    },
    setNotesSwipeStart(game, { payload }: PayloadAction<number>) {
      const { num } = game.board[game.selection]
      notesWrite = !game.board[payload].notes[num]
    },
    setNotesEnabled(game, { payload }: PayloadAction<boolean>) {
      game.notesEnabled = payload
    },
    removeLinkedNotes(game) {
      links[game.selection].forEach(link => {
        game.board[link].notes[game.board[game.selection].num] = false
      })
    },
    setNum(game, { payload }: PayloadAction<number>) {
      game.solved[game.board[game.selection].num] = false
      game.board[game.selection].notes = Array(10).fill(false)
      game.board[game.selection].num = payload

      const row = getRow(game.selection)
      const column = getColumn(game.selection)
      const region = getRegion(game.selection)

      if (checkRowFilled(game, row)) {
        game.filled.rows[row] = true
      }

      if (checkColumnFilled(game, column)) {
        game.filled.columns[column] = true
      }

      if (checkRegionFilled(game, region)) {
        game.filled.regions[region] = true
      }

      if (checkWon(game)) {
        game.events = []
        game.solved = Array(10).fill(true)
        game.status = "won"
        return
      }

      setSolved(game, payload)
      setCellStatus(game)
      setWhitelist(game)
    },
    setSelection(game, { payload }: PayloadAction<number>) {
      game.events.pop()
      if (game.selection !== payload) {
        game.selection = payload
        setCellStatus(game, false)
        setWhitelist(game)
      }
    },
    setStatus(game, { payload }: PayloadAction<string>) {
      game.status = payload
    },
    setTimer(game, { payload }: PayloadAction<number>) {
      game.time = payload
    },
    clear(game) {
      // TODO check events on multiple clear
      gameSlice.caseReducers.setNum(game, {
        payload: 0,
        type: "game/setNum",
      })
      game.board[game.selection].notes = Array(10).fill(false)
    },
    hint(game) {
      if (game.board[game.selection].init) {
        return
      }

      gameSlice.caseReducers.setNum(game, {
        payload: game.board[game.selection].solution,
        type: "game/setNum",
      })

      game.events = []
    },
    reset(game) {
      game.board = game.board.map(({ init, num, solution }) => ({
        init,
        notes: Array(10).fill(false),
        num: init ? num : 0,
        status: "",
        solution,
      }))
      game.events = initialState.events
      game.filled = initialState.filled
      game.mistakes = initialState.mistakes
      game.notesEnabled = initialState.notesEnabled
      game.selection = initialState.selection
      game.solved = game.board
        .reduce((acc, { num }) => {
          acc[num]++
          return acc
        }, Array(10).fill(0))
        .map((count, i) => (i ? count === 9 : false))
      game.status = "running"
      game.time = initialState.time
      game.whitelist = initialState.whitelist
    },
    solve(game) {
      game.board.forEach(({ solution }, i) => {
        game.board[i].num = solution
      })
      game.events = []
    },
    undo(game) {
      if (game.events.length) {
        game.events.pop()!.forEach(({ index, notes, num }) => {
          game.board[index].notes = notes
          game.board[index].num = num
        })

        setCellStatus(game)
        setWhitelist(game)
      }
    },
  },
})

let notesWrite = false

function getEvent({ board }: GameSlice, index: number): GameEvent {
  return {
    index,
    notes: board[index].notes.slice(),
    num: board[index].num,
  }
}

export const {
  pushBoard,
  pushLinks,
  pushSelection,
  setBoard,
  setNote,
  setNotesSwipe,
  setNotesSwipeStart,
  setNotesEnabled,
  removeLinkedNotes,
  setNum,
  setSelection,
  setStatus,
  setTimer,
  clear,
  hint,
  reset,
  solve,
  undo,
} = gameSlice.actions
export default gameSlice.reducer
export type GameSlice = typeof initialState
