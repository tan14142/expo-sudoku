import { useEffect, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setTheme } from "~/Store/Settings"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import animate from "~/Animations"
import styles from "~/Styles"
import * as themes from "~/Themes"

export default function ThemeButton() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.settings.theme)
  const [opacity, opacityTiming, opacityReverse] = animate(250, [1, 0])
  const [scaleX, scaleXTiming, scaleXReverse] = animate(250, [0, 1])

  function PressableColor({ selected }: { selected: themes.Theme }) {
    return (
      <Pressable
        style={[paletteStyle.button, { backgroundColor: selected.p, marginRight: 20 }]}
        onPress={() => handlePressColor(selected)}>
        {theme.p === selected.p && <MaterialCommunityIcons color="white" name="check" size={20} />}
      </Pressable>
    )
  }

  function handlePressColor(theme: themes.Theme) {
    Animated.parallel([scaleXReverse, opacityTiming]).start(() => {
      dispatch(setTheme(theme))
      opacityReverse.start()
      setIsOpen(false)
    })
  }

  function handlePressIcon() {
    opacityTiming.start(() => {
      Animated.parallel([scaleXTiming, opacityReverse]).start()
      setIsOpen(true)
    })
  }

  useEffect(() => {
    if (!isOpen) return
    const timeout = setTimeout(() => handlePressColor(theme), 5000)
    return () => clearTimeout(timeout)
  }, [isOpen])

  return isOpen ? (
    <Animated.View style={[paletteStyle.container, { scaleX, opacity }]}>
      {Object.values(themes).map(value => (
        <PressableColor selected={value} key={value.p} />
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
