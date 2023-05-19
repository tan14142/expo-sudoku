import { StyleSheet, View, Text } from "react-native"
import { useAppSelector } from "~/Store"
import Timer from "./Timer"

export default function GameHeader() {
  const { difficulty } = useAppSelector(state => state.game)
  const { displayTimer } = useAppSelector(state => state.settings)

  return (
    <View style={styles.container}>
      <Text selectable={false} style={styles.text}>
        {difficulty}
      </Text>
      {displayTimer && <Timer />}
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
