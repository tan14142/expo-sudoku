import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setSelection } from "~/Store/Game"
import { CellProps } from "~/Types"
import Notes from "./Notes"
import useSound from "~/Hooks/useSound"

export default function CellContent({ index }: CellProps) {
  const dispatch = useAppDispatch()
  const num = useAppSelector(state => state.game.board[index].num)
  const init = useAppSelector(state => state.game.board[index].init)
  const status = useAppSelector(state => state.game.board[index].status)
  const solution = useAppSelector(state => state.game.board[index].solution)
  const notesEnabled = useAppSelector(state => state.game.notesEnabled)
  const highlightLinkedCells = useAppSelector(state => state.settings.highlightLinkedCells)
  const highlightMatchingCells = useAppSelector(state => state.settings.highlightMatchingCells)
  const highlightMistake = useAppSelector(state => state.settings.highlightMistake)
  const theme = useAppSelector(state => state.settings.theme)
  const playSound = useSound()

  function getPressableStyle() {
    const pressableStyles: ViewStyle[] = [styles.pressable]

    if (status === "selected") {
      pressableStyles.push({ backgroundColor: theme.s })
    } else if (status === "mistake") {
      pressableStyles.push({ backgroundColor: theme.e })
    } else if (highlightMatchingCells && status === "matching") {
      pressableStyles.push({ backgroundColor: theme.t })
    } else if (highlightLinkedCells && status === "linked") {
      pressableStyles.push({ backgroundColor: theme.q })
    }

    return pressableStyles
  }

  function getTextStyle() {
    const textStyles: TextStyle[] = [styles.text]

    if (init) {
      textStyles.push(styles.textInit)
    } else if (
      num &&
      ((highlightMistake && num !== solution) || (!highlightMistake && status === "mistake"))
    ) {
      textStyles.push(styles.textMistake)
    } else {
      textStyles.push(styles.textCorrect)
    }

    return textStyles
  }

  function handlePress() {
    playSound(notesEnabled ? "pencil1" : "pen1")
    dispatch(setSelection(index))
  }

  return (
    <Pressable onPress={handlePress} style={getPressableStyle()}>
      {num ? (
        <Text selectable={false} style={getTextStyle()}>
          {num}
        </Text>
      ) : (
        <Notes index={index} />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableHighlightLinked: {
    backgroundColor: "rgba(48, 125, 246, 0.1)",
  },
  pressableHighlightMatching: {
    backgroundColor: "rgba(48, 125, 246, 0.2)",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textCorrect: {
    color: "#307DF6",
  },
  textMistake: {
    color: "red",
  },
  textInit: {
    color: "black",
  },
})
