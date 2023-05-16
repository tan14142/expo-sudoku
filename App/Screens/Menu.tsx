import { StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MenuButton from "~/Components/MenuButton"

export default () => {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MENU</Text>
      <View>
        <MenuButton handler={() => navigate("Game")} label="New Game" />
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
