import { StyleSheet, View, Text } from "react-native"
import { useAppSelector } from "~/Store"

export default function GameHeader() {
  const difficulty = useAppSelector(state => state.game.difficulty)

  return (
    <View style={styles.container}>
      <Text selectable={false} style={styles.text}>
        {difficulty}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
  },
})
