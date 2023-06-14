import { GestureResponderEvent, StyleSheet, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { pushBoard, setNotesSwipe, setNotesSwipeStart } from "~/Store/Game"
import { checkSelection } from "~/Utils"
import Cell from "./Cell"
import styles from "~/Styles"

export interface BoardProps {
  size: number
}

export default function Board({ size }: BoardProps) {
  const dispatch = useAppDispatch()
  const selection = useAppSelector(state => state.game.selection, checkSelection)
  const theme = useAppSelector(state => state.settings.theme)
  const cell = size / 9
  let startX = 0
  let startY = 0

  const calculateCell = (x: number, y: number): number => {
    const row = Math.floor(y / cell)
    const col = Math.floor(x / cell)
    return row * 9 + col
  }

  function handleStart(event: GestureResponderEvent) {
    if (isNaN(selection)) {
      return false
    }
    startX = event.nativeEvent.locationX
    startY = event.nativeEvent.locationY
    dispatch(pushBoard())
    dispatch(setNotesSwipeStart(calculateCell(startX, startY)))
    return true
  }

  function handleMove(event: GestureResponderEvent) {
    const { locationX: x, locationY: y } = event.nativeEvent

    if (x <= 0 || x >= size || y <= 0 || y >= size) {
      return
    }

    const dx = Math.abs(x - startX)
    const dy = Math.abs(y - startY)
    const tapThreshold = 10

    if (dx > tapThreshold || dy > tapThreshold) {
      dispatch(setNotesSwipe(calculateCell(x, y)))
    }
  }

  return (
    <View
      onStartShouldSetResponderCapture={handleStart}
      onResponderMove={handleMove}
      style={[
        style.board,
        styles.dropShadow,
        { backgroundColor: theme.pb, borderColor: theme.p, height: size },
      ]}>
      {Array(81)
        .fill(true)
        .map((_, i) => (
          <Cell key={i} index={i} size={cell - 0.9} />
        ))}
    </View>
  )
}

const style = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    borderWidth: 4,
    overflow: "hidden",
  },
})
// TODO: make square cells for swipe smaller, check why button cell sometimes is selected after swiping
