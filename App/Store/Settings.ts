import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import themes, { ThemeType } from "~/Themes"

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    displayAnimations: true,
    displayHinter: true,
    hints: 3,
    displayMistakes: true,
    mistakes: 3,
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
    theme: themes.green,
    vibration: true,
  },
  reducers: {
    setHints(settings, { payload }: PayloadAction<number>) {
      settings.hints = payload
    },
    setMistakes(settings, { payload }: PayloadAction<number>) {
      settings.mistakes = payload
    },
    setTheme(settings, { payload }: PayloadAction<ThemeType>) {
      settings.theme = payload
    },
    toggleDisplayAnimations(settings) {
      settings.displayAnimations = !settings.displayAnimations
    },
    toggleDisplayHinter(settings) {
      settings.displayHinter = !settings.displayHinter
    },
    toggleDisplayMistakes(settings) {
      settings.displayMistakes = !settings.displayMistakes
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
    toggleVibration(settings) {
      settings.vibration = !settings.vibration
    },
  },
})

export const {
  setHints,
  setMistakes,
  setTheme,
  toggleDisplayAnimations,
  toggleDisplayHinter,
  toggleDisplayMistakes,
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
  toggleVibration,
} = settingsSlice.actions
export default settingsSlice.reducer
