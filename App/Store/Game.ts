import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  difficulty: "",
  running: true,
  time: 0,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset(game, { payload }: PayloadAction<string | undefined>) {
      if (payload) game.difficulty = payload
      game.running = true
      game.time = 0
    },
    setRunning(game, { payload }: PayloadAction<boolean>) {
      game.running = payload
    },
    setTime(game, { payload }: PayloadAction<number>) {
      game.time = payload
    },
  },
})

export const { setRunning, setTime, reset } = gameSlice.actions
export default gameSlice.reducer
