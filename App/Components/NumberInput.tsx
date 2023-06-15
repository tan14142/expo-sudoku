import { StyleSheet, View } from "react-native"
import { useAppSelector } from "~/Store"
import PressableAnimated from "./Pressables/Animated"
import TextPoppins from "./TextPoppins"
import animate from "~/Animations"
import styles from "~/Styles"

interface NumberInputProps {
  disabled: boolean
  value: number
  decrement: () => void
  increment: () => void
}

export default function NumberInput({ disabled, value, decrement, increment }: NumberInputProps) {
  const theme = useAppSelector(state => state.settings.theme)
  const [opacityLeft, opacityLeftTiming] = animate(250, [1, 0.25])
  const [opacityRight, opacityRightTiming] = animate(250, [1, 0.25])

  function handlePressLeft() {
    decrement()
    opacityLeftTiming.start(({ finished }) => {
      if (finished) {
        opacityLeftTiming.reset()
      }
    })
  }

  function handlePressRight() {
    increment()
    opacityRightTiming.start(({ finished }) => {
      if (finished) {
        opacityRightTiming.reset()
      }
    })
  }

  return (
    <View style={style.container}>
      <PressableAnimated
        evelation={0}
        style={[style.pressableLeft, { backgroundColor: theme.sb, opacity: opacityLeft }]}
        onPress={handlePressLeft}>
        <TextPoppins>-</TextPoppins>
      </PressableAnimated>
      <PressableAnimated
        evelation={0}
        sound="tock"
        style={[style.pressableRight, { backgroundColor: theme.s, opacity: opacityRight }]}
        onPress={handlePressRight}>
        <TextPoppins>+</TextPoppins>
      </PressableAnimated>
      <View style={[style.value, styles.center]}>
        <TextPoppins style={{ fontSize: 11 }}>{value}</TextPoppins>
      </View>
      {disabled && <View style={style.overlay} />}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "grey",
    borderRadius: 20,
    overflow: "hidden",
    height: 20,
    width: 48,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .33)",
    height: 20,
    width: 48,
    position: "absolute",
  },
  pressableLeft: {
    paddingRight: 10,
    width: 24,
  },
  pressableRight: {
    paddingLeft: 10,
    width: 24,
  },
  value: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 20,
    width: 20,
    right: 34,
  },
})
