import { useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
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
      <View style={[styles.center, { flex: 2, transform: [{ scale }] }]}>
        <TextPoppins style={[style.header, { color: theme.p }]}>SUDOKU</TextPoppins>
      </View>
      <View style={[styles.center, { flex: 3 }]}>
        <Logo />
      </View>
      <View style={[styles.center, { flex: 3, transform: [{ scale }] }]}>
        <PressableAnimated
          disabled={status !== "running"}
          evelation={4}
          onPress={() => navigate("Game")}
          style={[
            styles.dropShadow,
            style.pressable,
            { backgroundColor: theme.p, opacity: +(status === "running") },
          ]}>
          <TextPoppins style={[style.pressableText, { color: theme.pf }]}>Continue</TextPoppins>
        </PressableAnimated>
        <PressableAnimated
          evelation={4}
          onPress={() => setModalVisible(true)}
          style={[styles.dropShadow, style.pressable, { backgroundColor: theme.p }]}>
          <TextPoppins style={[style.pressableText, { color: theme.pf }]}>New Game</TextPoppins>
        </PressableAnimated>
      </View>
    </>
  )
}

const { height } = Dimensions.get("window")
const availableHeight = (height - 24 - 12 - 42 - 12) / 3 - 40
const scale = availableHeight > 180 ? 1 : availableHeight / 180

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
    marginBottom: 16,
  },
  pressableText: {
    fontSize: 24,
    fontWeight: "700",
  },
})
