import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  difficulty: "",
  notesEnabled: false,
  running: true,
  time: 0,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset(game, { payload }: PayloadAction<string | undefined>) {
      if (payload) game.difficulty = payload
      game.notesEnabled = false
      game.running = true
      game.time = 0
    },
    setNotes(game, { payload }: PayloadAction<boolean>) {
      game.notesEnabled = payload
    },
    setRunning(game, { payload }: PayloadAction<boolean>) {
      game.running = payload
    },
    setTime(game, { payload }: PayloadAction<number>) {
      game.time = payload
    },
  },
})

export const { reset, setNotes, setRunning, setTime } = gameSlice.actions
export default gameSlice.reducer
