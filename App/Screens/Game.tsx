import { Dimensions, StyleSheet, View } from "react-native"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"

export default function Game() {
  return (
    <View style={styles.container}>
      <Board board={board} />
      <FeaturePad />
      <NumberPad />
    </View>
  )
}

// Todo remove this
const board = [
  5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 6,
  0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2, 0, 0,
  0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0, 0, 8, 0,
  0, 7, 9,
]

const width = Dimensions.get("window").width * 0.9 + 8

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
  },
})

// TODO: make notes number font smaller!
// TODO: on error highlight red 3x3, row or column if option is true
