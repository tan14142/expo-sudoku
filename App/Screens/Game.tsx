import { Dimensions, StyleSheet, View } from "react-native"
import { useAppSelector } from "~/Store"
import GameHeader from "~/Components/GameHeader"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"
import { checkLostOrWon } from "~/Utils"

export default function Game() {
  const status = useAppSelector(state => state.game.status, checkLostOrWon)

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
