import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CellType } from "~/Types"

interface BoardPayload {
  puzzle: number[]
  solution: number[]
}

interface CellPayload {
  index: number
  value: number
}

const boardSlice = createSlice({
  name: "settings",
  initialState: {
    cells: Array(81) as CellType[],
    inits: new Set<number>(),
    solution: Array(81) as number[],
  },
  reducers: {
    setBoard(state, { payload }: PayloadAction<BoardPayload>) {
      state.cells = payload.puzzle
      state.inits = new Set(
        payload.puzzle.reduce((acc, cur, i) => {
          if (cur) (acc as number[]).push(i)
          return acc
        }, []),
      )
      state.solution = payload.solution
    },
    setCell(state, { payload }: PayloadAction<CellPayload>) {
      state.cells[payload.index] = payload.value
    },
  },
})

export const { setBoard, setCell } = boardSlice.actions
export default boardSlice.reducer
