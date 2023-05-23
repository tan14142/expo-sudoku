import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setSelection } from "~/Store/Board"
import { CellProps } from "./Cell"

export default function Cell({ index }: CellProps) {
  const dispatch = useAppDispatch()
  const { cell, init, mistake, selection, solution } = useAppSelector(state => state.board[index])
  const highlightLinkedCells = useAppSelector(state => state.settings.highlightLinkedCells)
  const highlightMatchingCells = useAppSelector(state => state.settings.highlightMatchingCells)
  const highlightMistake = useAppSelector(state => state.settings.highlightMistake)

  function getPressableStyle() {
    const pressableStyles: ViewStyle[] = [styles.pressable]

    if (selection === "selected") {
      pressableStyles.push(styles.pressableSelected)
    } else if (mistake) {
      pressableStyles.push(styles.pressableHighlightMistake)
    } else if (highlightMatchingCells && selection === "matching") {
      pressableStyles.push(styles.pressableHighlightMatching)
    } else if (highlightLinkedCells && selection === "linked") {
      pressableStyles.push(styles.pressableHighlightLinked)
    }

    return pressableStyles
  }

  function getTextStyle() {
    const textStyles: TextStyle[] = [styles.text]

    if (init) {
      textStyles.push(styles.textInit)
    } else if (cell && cell !== solution && (highlightMistake || mistake)) {
      textStyles.push(styles.textMistake)
    } else {
      textStyles.push(styles.textCorrect)
    }

    return textStyles
  }

  function handlePress() {
    dispatch(setSelection(index))
  }

  return (
    <Pressable onPress={handlePress} style={getPressableStyle()}>
      <Text selectable={false} style={getTextStyle()}>
        {cell ? cell : ""}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableSelected: {
    borderColor: "#307DF6",
    borderRadius: 4,
    borderWidth: 1,
    margin: 1,
  },
  pressableHighlightLinked: {
    backgroundColor: "rgba(48, 125, 246, 0.1)",
  },
  pressableHighlightMatching: {
    backgroundColor: "rgba(48, 125, 246, 0.2)",
  },
  pressableHighlightMistake: {
    backgroundColor: "red",
  },
  text: {
    fontSize: 24,
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
