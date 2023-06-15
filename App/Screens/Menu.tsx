import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Home from "~/Components/Tabs/Home"
import Battle from "~/Components/Tabs/Battle"
import Trials from "~/Components/Tabs/Trials"
import Stats from "~/Components/Tabs/Stats"
import TextPoppins from "~/Components/TextPoppins"
import useSound from "~/Hooks/useSound"
import styles from "~/Styles"

type Tabs = "Home" | "Battle" | "Trials" | "Custom" | "Stats"

export default () => {
  const [tab, setTab] = useState<Tabs>("Home")
  const theme = useAppSelector(state => state.settings.theme)
  const isFocused = useIsFocused()
  const playSound = useSound()

  function renderTab() {
    if (!isFocused) return null

    playSound("navigate")

    switch (tab) {
      case "Home":
        return <Home />
      case "Battle":
        return <Battle />
      case "Trials":
        return <Trials />
      case "Stats":
        return <Stats />
    }
  }

  return (
    <View style={[styles.center, styles.padding, style.container]}>
      {renderTab()}
      <View style={style.footer}>
        <Pressable
          onPress={() => setTab("Home")}
          style={[style.pressable, styles.center, { opacity: tab === "Home" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="grid" size={24} color={theme.p} />
          <TextPoppins style={[style.pressableText, { color: theme.p }]}>Home</TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Battle")}
          style={[style.pressable, styles.center, { opacity: tab === "Battle" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="sword-cross" size={24} color={theme.p} />
          <TextPoppins style={[style.pressableText, { color: theme.p }]}>Battle</TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Trials")}
          style={[style.pressable, styles.center, { opacity: tab === "Trials" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="shield-sword" size={24} color={theme.p} />
          <TextPoppins style={[style.pressableText, { color: theme.p }]}>Trials</TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Custom")}
          style={[style.pressable, styles.center, { opacity: tab === "Custom" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="pencil-ruler" size={24} color={theme.p} />
          <TextPoppins style={[style.pressableText, { color: theme.p }]}>Custom</TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Stats")}
          style={[style.pressable, styles.center, { opacity: tab === "Stats" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="chart-box" size={24} color={theme.p} />
          <TextPoppins style={[style.pressableText, { color: theme.p }]}>Stats</TextPoppins>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
  },
  pressable: {
    paddingHorizontal: 10,
  },
  pressableText: {
    fontSize: 12,
    textAlign: "center",
  },
})

// TODO: prefetch, add tabs content
