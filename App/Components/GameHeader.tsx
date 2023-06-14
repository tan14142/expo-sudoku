import { StyleSheet, View, Text } from "react-native"
import { useAppSelector } from "~/Store"
import Timer from "~/Components/Timer"

export default function GameHeader() {
  const difficulty = useAppSelector(state => state.game.difficulty)

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={{ flex: 1 }}>
          <Text selectable={false} style={styles.text}>
            {difficulty}
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Timer />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
  },
})
