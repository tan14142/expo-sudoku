import { Dimensions, StyleSheet, View } from "react-native"
import { useAppSelector } from "~/Store"
import SelectionProvider from "~/Contexts/Selection"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"

export default function Game() {
  const { cells } = useAppSelector(state => state.board)

  return (
    <SelectionProvider>
      <View style={styles.container}>
        <Board cells={cells} />
        <FeaturePad />
        <NumberPad />
      </View>
    </SelectionProvider>
  )
}

const width = Dimensions.get("window").width * 0.9 + 8

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
  },
})

// TODO: make notes number font smaller!
// TODO: on error highlight red 3x3, row or column if option is true
