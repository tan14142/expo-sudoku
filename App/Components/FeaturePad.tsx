import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "~/Store"
import solve from "~/Utils/solve"

export default function FeaturePad() {
  const { cells } = useAppSelector(state => state.board)
  
  return (
    <View style={styles.row}>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Undo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Clear</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Reset</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => solve(cells as number[])}>
        <Text style={styles.text}>Solve</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Hint</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Notes</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307DF6",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
})
