import { Dimensions, StyleSheet, View } from "react-native"
import GameHeader from "~/Components/GameHeader"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"

export default function Game() {
  return (
    <View style={styles.container}>
      <GameHeader />
      <Board />
      <FeaturePad />
      <NumberPad />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9 + 8,
  },
})

// TODO: make notes number font smaller!
// TODO: on error highlight red 3x3, row or column if option is true
