import { Dimensions, Pressable, StyleSheet, Text } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setCell } from "~/Store/Board"

interface NumberPadButtonProps {
  num: number
}

export default function NumberPadButton({ num }: NumberPadButtonProps) {
  const dispatch = useAppDispatch()
  const index = useAppSelector(state => state.board.selection.index)
  const cell = useAppSelector(state => state.board.cells[index]?.cell)
  const solution = useAppSelector(state => state.board.cells[index]?.solution)
  const highlightMistake = useAppSelector(state => state.settings.highlightMistake)
  const lowlightInvalidInput = useAppSelector(state => state.settings.lowlightInvalidInput)
  const lowlightSolvedNumbers = useAppSelector(state => state.settings.lowlightSolvedNumbers)
  let isWhitelisted = false

  if (lowlightInvalidInput) {
    isWhitelisted = useAppSelector(state => state.board.selection.whitelist[num])
  }
  else if (lowlightSolvedNumbers) {
    isWhitelisted = useAppSelector(state => !state.board.solved[num])
  }

  function isBlacklisted() {
    if (!lowlightInvalidInput || !lowlightSolvedNumbers) {
      return false
    }
    return !isWhitelisted || (highlightMistake && cell === solution)
  } // TODO: gotta manual test lowlightSolvedNumbers at some point

  function handlePress(isAvailableOrForced?: boolean) {
    if (cell !== num) {
      (isAvailableOrForced || !isBlacklisted()) && dispatch(setCell(num))
    }
  }

  return (
    <Pressable
      style={[styles.button, isBlacklisted() && styles.faded]}
      onPress={() => handlePress()}
      onLongPress={() => handlePress(true)}>
      <Text selectable={false} style={styles.text}>
        {num}
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
