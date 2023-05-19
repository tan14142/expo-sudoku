import { useContext } from "react"
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native"
import { useAppSelector } from "~/Store"
import { SelectionContext } from "~/Contexts/Selection"
import { CellProps } from "./Cell"

export default function Cell({ index, value }: CellProps) {
  const { cells, inits, solution } = useAppSelector(state => state.game)
  const {
    highlightLinkedCells,
    highlightMatchingCells,
    highlightMistake
  } = useAppSelector(state => state.settings)
  const { selection, setSelection, links } = useContext(SelectionContext)

  function getPressableStyle() {
    const pressableStyles: ViewStyle[] = [styles.pressable]

    if (index === selection) {
      pressableStyles.push(styles.pressableSelected)
    } else if (highlightMistake && value && value !== solution[index]) {
      // Todo: make impacted rows / columns / region red
    } else if (highlightMatchingCells && value && value === cells[selection]) {
      pressableStyles.push(styles.pressableHighlightMatching)
    } else if (highlightLinkedCells && links.has(index)) {
      pressableStyles.push(styles.pressableHighlightLinked)
    }

    return pressableStyles
  }

  function getTextStyle() {
    const textStyles: TextStyle[] = [styles.text]

    if (inits[index]) {
      textStyles.push(styles.textInit)
    } else if (value === solution[index]) {
      textStyles.push(styles.textCorrect)
    } else {
      textStyles.push(styles.textMistake)
    }

    return textStyles
  }

  return (
    <Pressable onPress={() => setSelection(index)} style={getPressableStyle()}>
      <Text selectable={false} style={getTextStyle()}>
        {value ? value : ""}
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
  pressableHighlightMistake: {},
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
