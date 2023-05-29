import { GestureResponderEvent, LayoutChangeEvent, StyleSheet, View } from "react-native"
import { useAppDispatch } from "~/Store"
import { setNote, setNoteStart } from "~/Store/Board"
import Cell from "./Cell"

export default function Board() {
  const dispatch = useAppDispatch()
  let startX = 0
  let startY = 0
  let cellSize = 0
  let viewSize = 0

  const calculateCell = (x: number, y: number): number => {
    const row = Math.floor(y / cellSize)
    const col = Math.floor(x / cellSize)
    return row * 9 + col
  }

  function handleStart(event: GestureResponderEvent) {
    startX = event.nativeEvent.locationX
    startY = event.nativeEvent.locationY
    dispatch(setNoteStart(calculateCell(startX, startY)))
    return true
  }

  function handleMove(event: GestureResponderEvent) {
    const { locationX: x, locationY: y } = event.nativeEvent

    if (x <= 0 || x >= viewSize || y <= 0 || y >= viewSize) {
      return
    }

    const dx = Math.abs(x - startX)
    const dy = Math.abs(y - startY)
    const tapThreshold = 10

    if (dx > tapThreshold || dy > tapThreshold) {
      dispatch(setNote(calculateCell(x, y)))
    }
  }

  function setDimensions(event: LayoutChangeEvent) {
    cellSize = event.nativeEvent.layout.width / 9
    viewSize = event.nativeEvent.layout.width
  }

  return (
    <View
      onLayout={setDimensions}
      onStartShouldSetResponderCapture={handleStart}
      onResponderMove={handleMove}
      style={styles.board}>
      {Array(81)
        .fill(true)
        .map((_, i) => (
          <Cell key={i} index={i} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",

    borderColor: "#D7E1F4",
    borderRadius: 10,
    borderWidth: 4,

    elevation: 16,
    shadowColor: "#D7E1F4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
  },
})
// TODO: make square cells for swipe smaller, check why button cell sometimes is selected after swiping
