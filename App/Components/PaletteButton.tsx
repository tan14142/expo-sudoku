import { useState } from "react"
import { Animated, Pressable, StyleSheet, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAppSelector } from "~/Store"
import { buttonStyle } from "./Header"
import animate from "~/Animations"

export default function ThemeButton() {
  const { buttonSymbolColor: color } = useAppSelector(state => state.settings.theme)
  const [isOpen, setIsOpen] = useState(false)
  const [opacity, opacityTiming, opacityReverse] = animate(250, [1, 0])
  const [maxWidth, maxWidthTiming, maxWidthReverse] = animate(250, ["0%", "100%"])

  function handlePressColor(TODO: any) {
    Animated.parallel([maxWidthReverse, opacityTiming]).start(() => {
      setIsOpen(false)
      opacityReverse.start()
    })
  }

  function handlePressIcon() {
    opacityTiming.start(() => {
      Animated.parallel([maxWidthTiming, opacityReverse]).start()
      setIsOpen(true)
    })
  }

  return isOpen ? (
    <Animated.View style={[paletteStyle.container, { maxWidth, opacity }]}>
      <Pressable
        style={[paletteStyle.button, { backgroundColor: "orange", marginLeft: 4 }]}
        onPress={() => handlePressColor(1)}
      />
      <Pressable
        style={[paletteStyle.button, { backgroundColor: "green" }]}
        onPress={() => handlePressColor(2)}
      />
      <Pressable
        style={[paletteStyle.button, { backgroundColor: "grey" }]}
        onPress={() => handlePressColor(3)}
      />
    </Animated.View>
  ) : (
    <Pressable style={buttonStyle} onPress={handlePressIcon}>
      <Animated.View style={{ opacity }}>
        <Ionicons name="color-palette-outline" size={24} color={color} />
      </Animated.View>
    </Pressable>
  )
}

const paletteStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    overflow: "hidden",
  },
  button: {
    borderRadius: 10,
    height: 20,
    width: 20,
    marginRight: 4,
  },
})

// TODO: themes
