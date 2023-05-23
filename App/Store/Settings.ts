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
    toggleDisplaySolver(settings) {
      settings.displaySolver = !settings.displaySolver
    },
    toggleDisplayTimer(settings) {
      settings.displayTimer = !settings.displayTimer
    },
    toggleHighlightLinkedCells(settings) {
      settings.highlightLinkedCells = !settings.highlightLinkedCells
    },
    toggleHighlightMatchingNumbers(settings) {
      settings.highlightMatchingCells = !settings.highlightMatchingCells
    },
    toggleHighlightMistake(settings) {
      settings.highlightMistake = !settings.highlightMistake
    },
    toggleLowlightInvalidInput(settings) {
      settings.lowlightInvalidInput = !settings.lowlightInvalidInput
    },
    toggleLowlightSolvedNumbers(settings) {
      settings.lowlightSolvedNumbers = !settings.lowlightSolvedNumbers
    },
    toggleRemoveNotesAutomatically(settings) {
      settings.removeNotesAutomatically = !settings.removeNotesAutomatically
    },
    toggleScreenAlwaysOn(settings) {
      settings.screenAlwaysOn = !settings.screenAlwaysOn
    },
    toggleSound(settings) {
      settings.sound = !settings.sound
    },
    toggleTheme(settings) {
      settings.theme = themes.light // Todo
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
