import { Modal, Pressable, StyleSheet, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { useNavigation } from "@react-navigation/native"
import { reset, setBoard } from "~/Store/Game"
import Overlay from "./Overlay"
import TextPoppins from "~/Components/TextPoppins"
import generate from "~/Utils/generate"
import styles from "~/Styles"

interface NewGameProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export default function NewGame({ visible, setVisible }: NewGameProps) {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.settings.theme)

  async function handleNewGame(clues: number, difficulty: string, seeded = false) {
    dispatch(
      setBoard({
        difficulty,
        ...(await generate(clues, seeded ? new Date().toISOString().slice(0, 10) : undefined)),
      }),
    )
    dispatch(reset())
    navigate("Game")
    setVisible(false)
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible)
        }}>
        <Overlay setVisible={setVisible}>
          <View style={[style.container, styles.dropShadow, { backgroundColor: theme.pb }]}>
            <Pressable
              onPress={() => handleNewGame(60, "Easy")}
              style={[style.pressable, { borderBottomColor: theme.p }]}>
              <TextPoppins style={[style.pressableText, { color: theme.p }]}>Easy</TextPoppins>
            </Pressable>
            <Pressable
              onPress={() => handleNewGame(35, "Medium")}
              style={[style.pressable, { borderBottomColor: theme.p }]}>
              <TextPoppins style={[style.pressableText, { color: theme.p }]}>Medium</TextPoppins>
            </Pressable>
            <Pressable
              onPress={() => handleNewGame(30, "Hard")}
              style={[style.pressable, { borderBottomColor: theme.p }]}>
              <TextPoppins style={[style.pressableText, { color: theme.p }]}>Hard</TextPoppins>
            </Pressable>
            <Pressable
              onPress={() => handleNewGame(25, "Expert")}
              style={[style.pressable, { borderBottomWidth: 0 }]}>
              <TextPoppins style={[style.pressableText, { color: theme.p }]}>Expert</TextPoppins>
            </Pressable>
          </View>
        </Overlay>
      </Modal>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignItems: "center",
  },
  pressable: {
    borderBottomWidth: 1,
    width: 300,
  },
  pressableText: {
    padding: 16,
    fontSize: 24,
    textAlign: "center",
  },
})
