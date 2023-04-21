import { View, StyleSheet } from "react-native"
import MenuButton from "~/Components/MenuButton"

export default () => (
  <View style={styles.container}>
    <MenuButton handler={() => console.log(123)} label="New Game" />
    <MenuButton handler={() => console.log(123)} label="Custom Game" />
    <MenuButton handler={() => console.log(123)} label="Favorites" />
    <MenuButton handler={() => console.log(123)} label="Today's Puzzle" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
})

// TODO: fix handlers
