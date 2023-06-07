import { useEffect, useRef, useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { useAppSelector } from "~/Store"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import LogoAnimated from "./LogoAnimated"
import themes from "~/Themes"

export default function Logo() {
  const theme = useAppSelector(state => state.settings.theme)
  const items = [
    "checkbox-blank",
    "checkbox-marked",
    "close-box",
    "heart-box",
    "help-box",
    "pencil-box",
    "play-box",
    ...Array.from({ length: 9 }, (_, i) => `numeric-${i + 1}-box`),
  ] as (keyof typeof MaterialCommunityIcons.glyphMap)[]
  const [picks, setPicks] = useState(Array(9).fill(0))
  const lastRef = useRef(-2)

  useEffect(() => {
    if (lastRef.current === -2) {
      setTimeout(() => {
        const init = Array.from({ length: items.length - 1 }, (_, i) => i + 1)

        while (init.length > 9) {
          init.splice((Math.random() * init.length - 1) | (0 + 1), 1)
        }

        setPicks(init)
      }, 500)

      lastRef.current = -1
      return
    }
    setTimeout(
      () => {
        let pick: number

        while (true) {
          pick = (Math.random() * items.length) | 0
          if (!picks.includes(pick) && lastRef.current !== pick) break
        }

        setPicks(picks => {
          let slot = lastRef.current

          while (slot === lastRef.current) {
            slot = (Math.random() * picks.length) | 0
          }

          lastRef.current = slot
          picks[slot] = pick
          return [...picks]
        })
      },
      lastRef.current === -1 ? 1200 : 600,
    )
  }, [picks])

  return (
    <View style={[styles.container]}>
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <LogoAnimated key={i} color={themes[theme].c0} name={items[picks[i]]} size={logoSize} />
        ))}
    </View>
  )
}

const { width, height } = Dimensions.get("window")
const containerSize = Math.min(width, height) / 2
const logoSize = Math.min(width, height) / 6

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 96,
    width: containerSize,
  },
})
