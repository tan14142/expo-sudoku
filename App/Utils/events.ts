import { BoardType } from "~/Store/Board"

export type EventType = {
  index: number
  notes: boolean[]
  num: number
}

export function getEvent(board: BoardType, index: number): EventType {
  return {
    index,
    notes: board.cells[index].notes.slice(),
    num: board.cells[index].num,
  }
}

export function pushEvent(board: BoardType, index: number) {
  board.events.push([getEvent(board, index)])
}

export function pushEvents(board: BoardType, indexes: number[]) {
  board.events.push(indexes.map(index => getEvent(board, index)))
}
