import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake"
import { createSlice } from "@reduxjs/toolkit"
import themes from "../Themes"

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    displayAnimations: true,
    displayHinter: true,
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
    theme: "green" as keyof typeof themes,
    vibration: true,
  },
  reducers: {
    toggleDisplayAnimations(settings) {
      settings.displayAnimations = !settings.displayAnimations
    },
    toggleDisplayHinter(settings) {
      settings.displayHinter = !settings.displayHinter
    },
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

      if (settings.lowlightInvalidInput) {
        settings.lowlightSolvedNumbers = true
      }
    },
    toggleLowlightSolvedNumbers(settings) {
      settings.lowlightSolvedNumbers = !settings.lowlightSolvedNumbers
    },
    toggleRemoveNotesAutomatically(settings) {
      settings.removeNotesAutomatically = !settings.removeNotesAutomatically
    },
    toggleScreenAlwaysOn(settings) {
      // TODO: check
      if (settings.screenAlwaysOn) {
        deactivateKeepAwake()
      } else {
        activateKeepAwake()
      }
      settings.screenAlwaysOn = !settings.screenAlwaysOn
    },
    toggleSound(settings) {
      settings.sound = !settings.sound
    },
    toggleTheme(settings) {
      settings.theme = themes.light // Todo
    },
    toggleVibration(settings) {
      settings.vibration = !settings.vibration
    },
  },
})

export const {
  toggleDisplayAnimations,
  toggleDisplayHinter,
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
  toggleVibration,
} = settingsSlice.actions
export default settingsSlice.reducer
