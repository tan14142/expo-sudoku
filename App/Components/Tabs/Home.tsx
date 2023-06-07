import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import NewGame from "~/Modals/NewGame"
import Logo from "~/Components/Logo"
import TextPoppins from "~/Components/TextPoppins"
import styles from "~/Styles"
import themes from "~/Themes"
import PressableAnimated from "../Buttons/PressableAnimated"

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigation().navigate
  const status = useAppSelector(state => state.game.status)
  const theme = useAppSelector(state => state.settings.theme)

  return (
    <>
      <NewGame visible={modalVisible} setVisible={setModalVisible} />
      <View style={[styles.center, { flex: 1 }]}>
        <TextPoppins style={[style.header, { color: themes[theme].c0 }]}>SUDOKU</TextPoppins>
      </View>
      <View style={[styles.center, { flex: 1 }]}>
        <Logo />
      </View>
      <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
        {status === "running" && (
          <Pressable
            onPress={() => navigate("Game")}
            style={[styles.dropShadow, style.pressable, { backgroundColor: themes[theme].c0 }]}>
            <TextPoppins style={[style.pressableText]}>Continue</TextPoppins>
          </Pressable>
        )}
        <PressableAnimated
          onPress={() => setModalVisible(true)}
          style={[
            styles.dropShadow,
            style.pressable,
            { backgroundColor: themes[theme].c0, marginBottom: 80 },
          ]}>
          <TextPoppins style={[style.pressableText]}>New Game</TextPoppins>
        </PressableAnimated>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  header: {
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: 2,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 64,
    width: 300,
    marginBottom: 20,
  },
  pressableText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
})
