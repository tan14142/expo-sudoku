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
    <View style={[styles.center, styles.padding, style.container, { width: width + 24 }]}>
      <GameHeader />
      <Board size={width} />
      <FeaturePad size={responsiveSize} />
      <NumberPad size={responsiveSize} />
    </View>
  )
}

const { height, width: screenWidth } = Dimensions.get("window")
const width = ((height / screenWidth >= 2 ? screenWidth : height / 2) - styles.padding.padding * 2) | 0
const padHeight = 240
const pressableSize = 48
const responsivePadHeight = (width / 5) * 3.5
const responsiveSize =
  responsivePadHeight > padHeight
    ? pressableSize
    : (responsivePadHeight * pressableSize) / padHeight

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
})

// TODO: make notes number font smaller!
// TODO: on error highlight red 3x3, row or column if option is true
