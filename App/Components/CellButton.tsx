import { useContext } from "react"
import { StyleSheet, Text, Pressable, ViewStyle } from "react-native"
import { SelectionContext } from "~/Contexts/Selection"
import { CellProps } from "./Cell"

export default function Cell({ index, value }: CellProps) {
  const { selection, setSelection, links } = useContext(SelectionContext)

  function getPressableStyle() {
    const pressableStyles: ViewStyle[] = [styles.pressable]

    if (index === selection) {
      pressableStyles.push(styles.pressableSelected)
    } else if (links.has(index)) {
      pressableStyles.push(styles.pressableHighlight)
    }

    return pressableStyles
  }

  return (
    <Pressable onPress={() => setSelection(index)} style={getPressableStyle()}>
      <Text style={styles.text}>{value ? value : ""}</Text>
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
  pressableHighlight: {
    backgroundColor: "rgba(48, 125, 246, 0.1)",
  },
  text: {
    fontSize: 18,
  },
})
