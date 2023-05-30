import { Dimensions, Pressable, StyleSheet, Text } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { removeNotes, setNote, setNum } from "~/Store/Board"

interface NumberPadButtonProps {
  value: number
}

export default function NumberPadButton({ value }: NumberPadButtonProps) {
  const dispatch = useAppDispatch()
  const index = useAppSelector(state => state.board.selection.index)
  const num = useAppSelector(state => state.board.cells[index]?.num)
  const init = useAppSelector(state => state.board.cells[index]?.init)
  const solution = useAppSelector(state => state.board.cells[index]?.solution)
  const notesEnabled = useAppSelector(state => state.game.notesEnabled)
  const highlightMistake = useAppSelector(state => state.settings.highlightMistake)
  const lowlightInvalidInput = useAppSelector(state => state.settings.lowlightInvalidInput)
  const lowlightSolvedNumbers = useAppSelector(state => state.settings.lowlightSolvedNumbers)
  const removeNotesAutomatically = useAppSelector(state => state.settings.removeNotesAutomatically)
  const isWhitelisted = useAppSelector(state =>
    lowlightInvalidInput ? state.board.selection.whitelist[value] : !state.board.solved[value],
  )

  function isBlacklisted() {
    if (init) {
      return true
    }
    if (!(lowlightInvalidInput || lowlightSolvedNumbers)) {
      return false
    }
    return !isWhitelisted || (highlightMistake && num === solution)
  }

  function handlePress(isLongPress = false) {
    if (!init && (isLongPress || !isBlacklisted())) {
      if (notesEnabled) {
        dispatch(setNote(value))
      } else if (num !== value) {
        dispatch(setNum(value))

        if (highlightMistake && value !== solution) {
          return
        }

        if (removeNotesAutomatically) {
          dispatch(removeNotes())
        }
      }
    }
  }

  return (
    <Pressable
      style={[styles.button, isBlacklisted() && styles.faded]}
      onPress={() => handlePress()}
      onLongPress={() => handlePress(true)}>
      <Text selectable={false} style={styles.text}>
        {value}
      </Text>
    </Pressable>
  )
}

const width = Dimensions.get("window").width * 0.1

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307DF6",
    borderRadius: width / 4,
    height: width,
    width,

    elevation: 16,
    shadowColor: "#D7E1F4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
  },
  faded: {
    opacity: 0.5,
  },
  text: {
    color: "white",
  },
})
