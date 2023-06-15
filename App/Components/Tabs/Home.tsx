import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import NewGame from "~/Modals/NewGame"
import Logo from "~/Components/Logo"
import TextPoppins from "~/Components/TextPoppins"
import styles from "~/Styles"
import PressableAnimated from "~/Components/Pressables/Animated"

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigation().navigate
  const status = useAppSelector(state => state.game.status)
  const theme = useAppSelector(state => state.settings.theme)

  return (
    <>
      <NewGame visible={modalVisible} setVisible={setModalVisible} />
      <View style={[styles.center, { flex: 1 }]}>
        <TextPoppins style={[style.header, { color: theme.p }]}>SUDOKU</TextPoppins>
      </View>
      <View style={[styles.center, { flex: 1 }]}>
        <Logo />
      </View>
      <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
        {status === "running" && (
          <PressableAnimated
            evelation={4}
            onPress={() => navigate("Game")}
            style={[styles.dropShadow, style.pressable, { backgroundColor: theme.p }]}>
            <TextPoppins style={[style.pressableText, { color: theme.pf }]}>Continue</TextPoppins>
          </PressableAnimated>
        )}
        <PressableAnimated
          evelation={4}
          onPress={() => setModalVisible(true)}
          style={[
            styles.dropShadow,
            style.pressable,
            { backgroundColor: theme.p, marginBottom: 80 },
          ]}>
          <TextPoppins style={[style.pressableText, { color: theme.pf }]}>New Game</TextPoppins>
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
    fontSize: 24,
    fontWeight: "700",
  },
})
