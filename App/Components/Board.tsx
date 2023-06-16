import { GestureResponderEvent, StyleSheet, View, ViewStyle } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setNotesSwipe, setNotesSwipeStart } from "~/Store/Game"
import { checkPaused } from "~/Utils"
import Cell from "./Cell"
import styles from "~/Styles"

export interface BoardProps {
  width: number
}

export default function Board({ width }: BoardProps) {
  const dispatch = useAppDispatch()
  const isPaused = useAppSelector(state => state.game.status, checkPaused) === "paused"
  const theme = useAppSelector(state => state.settings.theme)
  const boardWidth = width - 8
  const cellWidth = boardWidth / 9
  let startX = 0
  let startY = 0

  const calculateCell = (x: number, y: number): number => {
    const row = Math.floor(y / cellWidth)
    const col = Math.floor(x / cellWidth)
    return row * 9 + col
  }

  function handleStart(event: GestureResponderEvent) {
    startX = event.nativeEvent.locationX
    startY = event.nativeEvent.locationY
    dispatch(setNotesSwipeStart(calculateCell(startX, startY)))
    return true
  }

  function handleMove(event: GestureResponderEvent) {
    const { locationX: x, locationY: y } = event.nativeEvent

    if (x <= 0 || x >= boardWidth || y <= 0 || y >= boardWidth) {
      return
    }

    const dx = Math.abs(x - startX)
    const dy = Math.abs(y - startY)
    const tapThreshold = 4

    if (dx > tapThreshold || dy > tapThreshold) {
      dispatch(setNotesSwipe(calculateCell(x, y)))
    }
  }

  function LineBold({ style }: { style: ViewStyle }) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: theme.p,
            position: "absolute",
          },
        ]}
      />
    )
  }

  function LineThin({ style }: { style: ViewStyle }) {
    return (
      <View
        style={[
          style,
          {
            // TODO: change color
            backgroundColor: theme.p,
            position: "absolute",
          },
        ]}
      />
    )
  }

  return (
    <View
      onStartShouldSetResponderCapture={handleStart}
      onResponderMove={handleMove}
      style={[
        style.board,
        styles.dropShadow,
        { backgroundColor: theme.pb, borderColor: theme.p, height: width, width },
      ]}>
      {isPaused
        ? null
        : Array(81) // TODO: overlay
            .fill(true)
            .map((_, i) => <Cell key={i} index={i} width={cellWidth} />)}
      <LineThin style={{ height: boardWidth, width: 1, left: cellWidth }} />
      <LineThin style={{ height: boardWidth, width: 1, left: cellWidth * 2 }} />
      <LineThin style={{ height: boardWidth, width: 1, left: cellWidth * 4 }} />
      <LineThin style={{ height: boardWidth, width: 1, left: cellWidth * 5 }} />
      <LineThin style={{ height: boardWidth, width: 1, left: cellWidth * 7 }} />
      <LineThin style={{ height: boardWidth, width: 1, left: cellWidth * 8 }} />
      <LineThin style={{ height: 1, width: boardWidth, top: cellWidth }} />
      <LineThin style={{ height: 1, width: boardWidth, top: cellWidth * 2 }} />
      <LineThin style={{ height: 1, width: boardWidth, top: cellWidth * 4 }} />
      <LineThin style={{ height: 1, width: boardWidth, top: cellWidth * 5 }} />
      <LineThin style={{ height: 1, width: boardWidth, top: cellWidth * 7 }} />
      <LineThin style={{ height: 1, width: boardWidth, top: cellWidth * 8 }} />
      <LineBold style={{ height: boardWidth, width: 2, left: cellWidth * 3 - 1 }} />
      <LineBold style={{ height: boardWidth, width: 2, left: cellWidth * 6 - 1 }} />
      <LineBold style={{ height: 2, width: boardWidth, top: cellWidth * 3 - 1 }} />
      <LineBold style={{ height: 2, width: boardWidth, top: cellWidth * 6 - 1 }} />
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
// TODO: check if threshhold 4 is ok, check why button cellWidth sometimes is selected after swiping
