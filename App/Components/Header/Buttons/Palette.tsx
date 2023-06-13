import { useEffect, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setTheme } from "~/Store/Settings"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import animate from "~/Animations"
import styles from "~/Styles"
import themes from "~/Themes"

export default function ThemeButton() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.settings.theme)
  const [opacity, opacityTiming, opacityReverse] = animate(250, [1, 0])
  const [maxWidth, maxWidthTiming, maxWidthReverse] = animate(250, ["0%", "100%"])

  function PressableColor({ color }: { color: keyof typeof themes }) {
    return (
      <Pressable
        style={[paletteStyle.button, { backgroundColor: color, marginLeft: 16 }]}
        onPress={() => handlePressColor(color)}>
        {theme === color && <MaterialCommunityIcons color="white" name="check" size={20} />}
      </Pressable>
    )
  }

  function handlePressColor(color: keyof typeof themes) {
    Animated.parallel([maxWidthReverse, opacityTiming]).start(() => {
      dispatch(setTheme(color))
      opacityReverse.start()
      setIsOpen(false)
    })
  }

  function handlePressIcon() {
    opacityTiming.start(() => {
      Animated.parallel([maxWidthTiming, opacityReverse]).start()
      setIsOpen(true)
    })
  }

  useEffect(() => {
    if (!isOpen) return
    const timeout = setTimeout(() => handlePressColor(theme), 5000)
    return () => clearTimeout(timeout)
  }, [isOpen])

  return isOpen ? (
    <Animated.View style={[paletteStyle.container, { maxWidth, opacity }]}>
      {Object.keys(themes).map(color => (
        <PressableColor color={color as keyof typeof themes} key={color} />
      ))}
    </Animated.View>
  ) : (
    <Pressable style={styles.headerButton} onPress={handlePressIcon}>
      <Animated.View style={{ opacity }}>
        <MaterialCommunityIcons color="white" name="palette" size={24} />
      </Animated.View>
    </Pressable>
  )
}

const paletteStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 16,
    overflow: "hidden",
  },
  button: {
    borderColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    height: 22,
    width: 22,
  },
})

// TODO: themes
