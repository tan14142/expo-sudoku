import { createSlice } from "@reduxjs/toolkit"
import themes from "../Themes"

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    displaySolver: true,
    displayTimer: true,
    highlightLinkedCells: true,
    highlightMatchingCells: true,
    highlightMistake: true,
    lowlightInvalidInput: true,
    lowlightSolvedNumbers: true,
    removeNotesAutomatically: true,
    screenAlwaysOn: true,
    sound: true,
    theme: themes.light,
  },
  reducers: {
    toggleDisplaySolver(slice) {
      slice.displaySolver = !slice.displaySolver
    },
    toggleDisplayTimer(slice) {
      slice.displayTimer = !slice.displayTimer
    },
    toggleHighlightLinkedCells(slice) {
      slice.highlightLinkedCells = !slice.highlightLinkedCells
    },
    toggleHighlightMatchingNumbers(slice) {
      slice.highlightMatchingCells = !slice.highlightMatchingCells
    },
    toggleHighlightMistake(slice) {
      slice.highlightMistake = !slice.highlightMistake
    },
    toggleLowlightInvalidInput(slice) {
      slice.lowlightInvalidInput = !slice.lowlightInvalidInput
    },
    toggleLowlightSolvedNumbers(slice) {
      slice.lowlightSolvedNumbers = !slice.lowlightSolvedNumbers
    },
    toggleRemoveNotesAutomatically(slice) {
      slice.removeNotesAutomatically = !slice.removeNotesAutomatically
    },
    toggleScreenAlwaysOn(slice) {
      slice.screenAlwaysOn = !slice.screenAlwaysOn
    },
    toggleSound(slice) {
      slice.sound = !slice.sound
    },
    toggleTheme(slice) {
      slice.theme = themes.light // Todo
    },
  },
})

export const {
  toggleDisplayTimer,
  toggleDisplaySolver,
  toggleHighlightLinkedCells,
  toggleHighlightMatchingNumbers,
  toggleHighlightMistake,
  toggleLowlightInvalidInput,
  toggleLowlightSolvedNumbers,
  toggleRemoveNotesAutomatically,
  toggleScreenAlwaysOn,
  toggleSound,
  toggleTheme,
} = settingsSlice.actions
export default settingsSlice.reducer
