import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import {
  pushSelection,
  setNotesEnabled,
  setStatus,
  clear,
  hint,
  reset,
  solve,
  undo,
} from "~/Store/Game"
import { checkSelection } from "~/Utils"

export default function FeaturePad() {
  const dispatch = useAppDispatch()
  const selection = useAppSelector(state => state.game.selection, checkSelection)
  const displayHinter = useAppSelector(state => state.settings.displayHinter)
  const displaySolver = useAppSelector(state => state.settings.displaySolver)
  const notesEnabled = useAppSelector(state => state.game.notesEnabled)

  function handleClear() {
    if (!isNaN(selection)) {
      dispatch(pushSelection())
      dispatch(clear())
    }
  }

  function handleHint() {
    if (!isNaN(selection)) {
      dispatch(hint())
    }
  }

  function handleReset() {
    dispatch(reset())
  }

  function handleSolve() {
    dispatch(setStatus("paused"))
    dispatch(solve())
  }

  function handleNotes() {
    dispatch(setNotesEnabled(!notesEnabled))
  }

  function handleUndo() {
    dispatch(undo())
  }

  return (
    <View style={styles.row}>
      <Pressable style={styles.button} onPress={handleUndo}>
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
      <Pressable
        style={[styles.button, { display: displayHinter ? "flex" : "none" }]}
        onPress={handleHint}>
        <Text selectable={false} style={styles.text}>
          Hint
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleNotes}>
        <Text selectable={false} style={styles.text}>
          {notesEnabled ? "Notes ✓" : "Notes"}
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
