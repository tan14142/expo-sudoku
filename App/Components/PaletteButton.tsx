import { Animated, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAppSelector } from "~/Store"
import animate from "~/Animations"

export default function ThemeButton() {
  const { buttonSymbolColor: color } = useAppSelector(state => state.settings.theme)
  const [opacity, rotate, trigger] = animate(500, () => {})

  return (
    <Pressable onPress={trigger} style={styles.button}>
      <Animated.View style={{ opacity, transform: [{ rotate }] }}>
        <Ionicons name="color-palette-outline" size={24} color={color} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
})

// TODO: themes
