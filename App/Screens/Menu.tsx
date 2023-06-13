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
import themes from "~/Themes"

type TabsType = "Home" | "Battle" | "Trials" | "Custom" | "Stats"

export default () => {
  const [tab, setTab] = useState<TabsType>("Home")
  const theme = useAppSelector(state => state.settings.theme)
  const isFocused = useIsFocused()
  const playSound = useSound()

  if (isFocused) {
    playSound("navigate")
  }

  function renderTab() {
    if (!isFocused) return null

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
    <View style={style.container}>
      {renderTab()}
      <View style={[style.footer]}>
        <Pressable
          onPress={() => setTab("Home")}
          style={[style.pressable, styles.center, { opacity: tab === "Home" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="grid" size={24} color={themes[theme].c0} />
          <TextPoppins style={[style.pressableText, { color: themes[theme].c0 }]}>Home</TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Battle")}
          style={[style.pressable, styles.center, { opacity: tab === "Battle" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="sword-cross" size={24} color={themes[theme].c0} />
          <TextPoppins style={[style.pressableText, { color: themes[theme].c0 }]}>
            Battle
          </TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Trials")}
          style={[style.pressable, styles.center, { opacity: tab === "Trials" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="shield-sword" size={24} color={themes[theme].c0} />
          <TextPoppins style={[style.pressableText, { color: themes[theme].c0 }]}>
            Trials
          </TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Custom")}
          style={[style.pressable, styles.center, { opacity: tab === "Custom" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="pencil-ruler" size={24} color={themes[theme].c0} />
          <TextPoppins style={[style.pressableText, { color: themes[theme].c0 }]}>
            Custom
          </TextPoppins>
        </Pressable>
        <Pressable
          onPress={() => setTab("Stats")}
          style={[style.pressable, styles.center, { opacity: tab === "Stats" ? 1 : 0.25 }]}>
          <MaterialCommunityIcons name="chart-box" size={24} color={themes[theme].c0} />
          <TextPoppins style={[style.pressableText, { color: themes[theme].c0 }]}>
            Stats
          </TextPoppins>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  pressable: {
    padding: 8,
  },
  pressableText: {
    fontSize: 12,
    textAlign: "center",
  },
})
