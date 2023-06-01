import { Dimensions, Pressable, StyleSheet, Text, Vibration } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { pushLinks, pushSelection, removeLinkedNotes, setNote, setNum } from "~/Store/Game"

interface NumberPadButtonProps {
  value: number
}

export default function NumberPadButton({ value }: NumberPadButtonProps) {
  const dispatch = useAppDispatch()
  const selection = useAppSelector(state => state.game.selection)
  const num = useAppSelector(state => state.game.board[selection]?.num)
  const init = useAppSelector(state => state.game.board[selection]?.init)
  const solution = useAppSelector(state => state.game.board[selection]?.solution)
  const notesEnabled = useAppSelector(state => state.game.notesEnabled)
  const solved = useAppSelector(state => state.game.solved[value])
  const whitelist = useAppSelector(state => state.game.whitelist[value])
  const highlightMistake = useAppSelector(state => state.settings.highlightMistake)
  const lowlightInvalidInput = useAppSelector(state => state.settings.lowlightInvalidInput)
  const lowlightSolvedNumbers = useAppSelector(state => state.settings.lowlightSolvedNumbers)
  const removeNotesAutomatically = useAppSelector(state => state.settings.removeNotesAutomatically)
  const vibration = useAppSelector(state => state.settings.vibration)
  const isWhitelisted = lowlightInvalidInput ? whitelist : !solved

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
    if (!isNaN(selection) && !init && (isLongPress || !isBlacklisted())) {
      if (notesEnabled) {
        dispatch(pushSelection())
        dispatch(setNote(value))
      } else if (num !== value) {
        dispatch(pushSelection())
        dispatch(setNum(value))

        if (value !== solution) {
          if (vibration && isBlacklisted()) {
            Vibration.vibrate()
          }
          if (highlightMistake) {
            return
          }
        }

        if (removeNotesAutomatically) {
          dispatch(pushLinks())
          dispatch(removeLinkedNotes())
        }
      }
    }
  }

  return (
    <Pressable
      style={[styles.button, isBlacklisted() && styles.faded, notesEnabled && styles.greyed]}
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
  greyed: {
    backgroundColor: "#888888",
  },
  text: {
    color: "white",
  },
})
