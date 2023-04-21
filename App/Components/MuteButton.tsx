import { Animated, Pressable, StyleSheet } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { useAppDispatch, useAppSelector } from "~/Store"
import { toggleSound } from "~/Store/Settings"
import animate from "~/Animations"

export default function SoundButton() {
  const {
    theme: { buttonSymbolColor: color },
    sound,
  } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()
  const [opacity, rotate, trigger] = animate(500, () => dispatch(toggleSound()))

  return (
    <Pressable onPress={trigger} style={styles.button}>
      <Animated.View style={{ opacity, transform: [{ rotate }] }}>
        <Octicons name={sound ? "unmute" : "mute"} size={24} color={color} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
})
