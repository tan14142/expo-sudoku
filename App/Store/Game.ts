import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CellType } from "~/Types"

interface BoardPayload {
  difficulty: string
  puzzle: number[]
  solution: number[]
}

interface CellPayload {
  index: number
  value: number
}

const gameSlice = createSlice({
  name: "settings",
  initialState: {
    cells: Array(81) as CellType[],
    inits: Array(81) as boolean[],
    solution: Array(81) as number[],
    difficulty: "",
    running: true,
    time: 0,
  },
  reducers: {
    setBoard(slice, { payload }: PayloadAction<BoardPayload>) {
      slice.cells = payload.puzzle
      slice.inits = payload.puzzle.map(v => !!v)
      slice.solution = payload.solution
      slice.difficulty = payload.difficulty
      slice.running = true
      slice.time = 0
    },
    setCell(slice, { payload }: PayloadAction<CellPayload>) {
      slice.cells[payload.index] = payload.value
    },
    setRunning(slice, { payload }: PayloadAction<boolean>) {
      slice.running = payload
    },
    setTime(slice, { payload }: PayloadAction<number>) {
      slice.time = payload
    },
  },
})

export const { setBoard, setCell, setTime, setRunning } = gameSlice.actions
export default gameSlice.reducer
