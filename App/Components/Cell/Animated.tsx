import { useEffect } from "react"
import { Animated, StyleSheet } from "react-native"
import { useAppSelector } from "~/Store"
import { getColumn, getRegion, getRow } from "~/Utils"
import { CellProps } from "~/Types"
import CellButton from "./Content"
import animate from "~/Animations"
import shakeX from "~/Animations/shakeX"

export default function CellAnimated({ index, size }: CellProps) {
  const rowFilled = useAppSelector(state => state.game.filled.rows[getRow(index)])
  const columnFilled = useAppSelector(state => state.game.filled.columns[getColumn(index)])
  const regionFilled = useAppSelector(state => state.game.filled.regions[getRegion(index)])
  const rowMistake = useAppSelector(state => state.game.mistakes.rows[getRow(index)])
  const columnMistake = useAppSelector(state => state.game.mistakes.columns[getColumn(index)])
  const regionMistake = useAppSelector(state => state.game.mistakes.regions[getRegion(index)])
  const displayAnimations = useAppSelector(state => state.settings.displayAnimations)
  const [rotateY, rotateYTiming] = animate(500, ["0deg", "180deg"])
  const [scaleX, scaleXTiming] = animate(500, [1, -1])
  const [translateX, triggerShakeX] = shakeX()

  if (displayAnimations) {
    if (rowMistake || columnMistake || regionMistake) {
      triggerShakeX()
    }
  }

  useEffect(() => {
    if (displayAnimations && (rowFilled || columnFilled || regionFilled)) {
      Animated.parallel([rotateYTiming, scaleXTiming]).start(({ finished }) => {
        if (finished) {
          rotateYTiming.reset()
          scaleXTiming.reset()
        }
      })
      return () => {
        rotateYTiming.stop()
        scaleXTiming.stop()
      }
    }
  }, [rowFilled, columnFilled, regionFilled])

  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateY }, { scaleX }, { translateX }] }]}>
      <CellButton index={index} size={size} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
