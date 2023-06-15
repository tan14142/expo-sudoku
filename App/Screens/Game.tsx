import { Dimensions, StyleSheet, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import { checkLostOrWon } from "~/Utils"
import GameHeader from "~/Components/GameHeader"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"
import styles from "~/Styles"
import useSound from "~/Hooks/useSound"

export default function Game() {
  const isFocused = useIsFocused()
  const status = useAppSelector(state => state.game.status, checkLostOrWon)
  const playSound = useSound()

  if (isFocused) {
    playSound("penClick")
  }

  return (
    <View style={[styles.padding, style.container]}>
      <GameHeader />
      <Board size={boardSize} />
      <FeaturePad size={featurePadSize} />
      <NumberPad size={numberPadSize} />
    </View>
  )
}

const { height, width } = Dimensions.get("window")
const boardSize =
  ((height / width >= 16 / 9 ? width : (height / 16) * 9) - styles.padding.padding * 2) | 0
const featurePadSize = boardSize / 4
const numberPadSize = boardSize / 5

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
})

// TODO: make notes number font smaller!
// TODO: on error highlight red 3x3, row or column if option is true
