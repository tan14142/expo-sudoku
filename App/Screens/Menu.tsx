import { StyleSheet, Text, View } from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "~/Store"
import { reset, setBoard } from "~/Store/Game"
import MenuButton from "~/Components/MenuButton"
import generate from "~/Utils/generate"
import useSound from "~/Hooks/useSound"

export default () => {
  const isFocused = useIsFocused()
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const playSound = useSound()

  function handleNewGame(clues: number, difficulty: string) {
    dispatch(
      setBoard({
        difficulty,
        ...generate(clues),
      }),
    )
    dispatch(reset())
    navigate("Game")
  }

  if (isFocused) {
    playSound("navigate")
  }

  return (
    <View style={styles.container}>
      <Text selectable={false} style={styles.title}>
        MENU
      </Text>
      <View>
        <MenuButton handler={() => handleNewGame(60, "Easy")} label="New Game Easy 80" />
        <MenuButton handler={() => handleNewGame(35, "Medium")} label="New Game Medium 35" />
        <MenuButton handler={() => handleNewGame(30, "Hard")} label="New Game Hard 30" />
        <MenuButton handler={() => handleNewGame(25, "Expert")} label="New Game Expert 25" />
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
