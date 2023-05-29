import { StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "~/Store"
import { CellProps } from "./Cell"

export default function Notes({ index }: CellProps) {
  const { notes } = useAppSelector(state => state.board.cells[index])

  return (
    <View style={styles.container}>
      {notes.slice(1).map((v, i) => (
        <Text key={i} selectable={false} style={[styles.text, !v && styles.opaque]}>
          {i + 1}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  opaque: {
    opacity: 0,
  },
  text: {
    width: "33%",
    height: "33%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 8,
  },
})
