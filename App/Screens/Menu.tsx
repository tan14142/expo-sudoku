import { StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "~/Store"
import { setBoard } from "~/Store/Board"
import MenuButton from "~/Components/MenuButton"
import generate from "~/Utils/generate"

export default () => {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()

  function handleNewGame(clues: number) {
    dispatch(setBoard(generate(clues)))
    navigate("Game")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MENU</Text>
      <View>
        <MenuButton handler={() => handleNewGame(40)} label="New Game Easy 40" />
        <MenuButton handler={() => handleNewGame(35)} label="New Game Medium 35" />
        <MenuButton handler={() => handleNewGame(30)} label="New Game Hard 30" />
        <MenuButton handler={() => handleNewGame(25)} label="New Game Expert 25" />
        <MenuButton handler={() => console.log(123)} label="Custom Game" />
        <MenuButton handler={() => console.log(123)} label="Favorites" />
        <MenuButton handler={() => console.log(123)} label="Today's Puzzle" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
})

// TODO: fix handlers
