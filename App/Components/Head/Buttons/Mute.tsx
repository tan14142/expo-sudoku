import { Animated, Pressable } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { toggleSound } from "~/Store/Settings"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Glyth } from "~/Types"
import animate from "~/Animations"
import styles from "~/Styles"

export default function SoundButton() {
  const sound = useAppSelector(state => state.settings.sound)
  const dispatch = useAppDispatch()
  const [opacity, timing] = animate(500, [1, 0, 1])
  const icon = ("volume" + (sound ? "-high" : "-low")) as Glyth

  function handlePress() {
    setTimeout(() => dispatch(toggleSound()), 250)
    timing.start(() => {
      timing.reset()
    })
  }

  return (
    <Pressable onPress={handlePress} style={[styles.headerButton, { marginRight: 0 }]}>
      <Animated.View style={{ opacity }}>
        <MaterialCommunityIcons color="white" name={icon} size={24} />
      </Animated.View>
    </Pressable>
  )
}
