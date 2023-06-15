import { green } from "~/Themes"
import { GameEvent } from "~/Types"

export const game = {
  board: Array.from({ length: 81 }, () => ({
    init: false,
    notes: Array<boolean>(10).fill(false),
    num: 0,
    status: "",
    solution: 0,
  })),
  events: [] as GameEvent[][],
  difficulty: "",
  filled: {
    rows: Array<boolean>(9).fill(false),
    columns: Array<boolean>(9).fill(false),
    regions: Array<boolean>(9).fill(false),
  },
  mistakes: {
    rows: Array<number>(9).fill(0),
    columns: Array<number>(9).fill(0),
    regions: Array<number>(9).fill(0),
  },
  notesEnabled: false,
  selection: NaN,
  solved: Array<boolean>(10).fill(false),
  status: "init",
  time: 0,
  whitelist: Array<boolean>(10).fill(false),
}

export const settings = {
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
  theme: green,
  vibration: true,
}
