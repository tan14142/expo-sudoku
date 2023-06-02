import { Dimensions, StyleSheet, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import GameHeader from "~/Components/GameHeader"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"
import { checkLostOrWon } from "~/Utils"
import useSound from "~/Hooks/useSound"

export default function Game() {
  const isFocused = useIsFocused()
  const status = useAppSelector(state => state.game.status, checkLostOrWon)
  const playSound = useSound()

  if (isFocused) {
    playSound("penClick")
  }

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
