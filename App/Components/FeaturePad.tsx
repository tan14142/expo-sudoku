import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setCell, reset, solve } from "~/Store/Board"
import { reset as resetGame, setRunning } from "~/Store/Game"

export default function FeaturePad() {
  const dispatch = useAppDispatch()
  const displaySolver = useAppSelector(state => state.settings.displaySolver)

  function handleClear() {
    dispatch(setCell(0))
  }

  function handleReset() {
    dispatch(reset())
    dispatch(resetGame())
  }

  function handleSolve() {
    dispatch(solve())
    dispatch(setRunning(false))
  }

  return (
    <View style={styles.row}>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text selectable={false} style={styles.text}>
          Undo
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleClear}>
        <Text selectable={false} style={styles.text}>
          Clear
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleReset}>
        <Text selectable={false} style={styles.text}>
          Reset
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, { display: displaySolver ? "flex" : "none" }]}
        onPress={handleSolve}>
        <Text selectable={false} style={styles.text}>
          Solve
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text selectable={false} style={styles.text}>
          Hint
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text selectable={false} style={styles.text}>
          Notes
        </Text>
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
