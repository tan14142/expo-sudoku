import { createSlice } from "@reduxjs/toolkit"
import themes from "../Themes"

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    displaySolver: true,
    displayTimer: true,
    highlightCurrentTrack: true,
    highlightIdenticalNumbers: true,
    highlightMistakenInput: true,
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
    toggleHighlightCurrentTrack(slice) {
      slice.highlightCurrentTrack = !slice.highlightCurrentTrack
    },
    toggleHighlightIdenticalNumbers(slice) {
      slice.highlightIdenticalNumbers = !slice.highlightIdenticalNumbers
    },
    toggleHighlightMistakenInput(slice) {
      slice.highlightMistakenInput = !slice.highlightMistakenInput
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
      slice.theme = themes.light
    },
  },
})

export const {
  toggleDisplayTimer,
  toggleDisplaySolver,
  toggleHighlightCurrentTrack,
  toggleHighlightIdenticalNumbers,
  toggleHighlightMistakenInput,
  toggleLowlightInvalidInput,
  toggleLowlightSolvedNumbers,
  toggleRemoveNotesAutomatically,
  toggleScreenAlwaysOn,
  toggleSound,
  toggleTheme,
} = settingsSlice.actions
export default settingsSlice.reducer
