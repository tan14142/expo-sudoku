import { MaterialCommunityIcons } from "@expo/vector-icons"

export type CellProps = {
  index: number
  size: number
}

export type GameEvent = {
  index: number
  notes: boolean[]
  num: number
}

export type Glyth = keyof typeof MaterialCommunityIcons.glyphMap
