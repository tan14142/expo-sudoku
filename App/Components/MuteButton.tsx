import { Animated, Pressable } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { toggleSound } from "~/Store/Settings"
import { Octicons } from "@expo/vector-icons"
import { buttonStyle } from "./Header"
import animate from "~/Animations"

export default function SoundButton() {
  const { buttonSymbolColor: color } = useAppSelector(state => state.settings.theme)
  const sound = useAppSelector(state => state.settings.sound)
  const dispatch = useAppDispatch()
  const [interpolation, timing] = animate(500, [1, 0, 1])

  function handlePress() {
    setTimeout(() => dispatch(toggleSound()), 250)
    timing.start(() => {
      timing.reset()
    })
  }

  return (
    <Pressable onPress={handlePress} style={[buttonStyle, { margin: 0 }]}>
      <Animated.View style={{ opacity: interpolation }}>
        <Octicons name={sound ? "unmute" : "mute"} size={24} color={color} />
      </Animated.View>
    </Pressable>
  )
}
