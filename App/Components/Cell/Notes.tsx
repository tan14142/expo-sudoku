import { StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "~/Store"
import TextPoppins from "../TextPoppins"

export default function CellNotes({ index }: CellType) {
  const notes = useAppSelector(state => state.game.board[index].notes)

  return (
    <View style={styles.container}>
      {notes.slice(1).map((v, i) => (
        <TextPoppins key={i} style={[styles.text, !v && styles.opaque]}>
          {i + 1}
        </TextPoppins>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  opaque: {
    opacity: 0,
  },
  text: {
    width: "33%",
    height: "33%",
    lineHeight: 16,
    textAlign: "center",
    fontSize: 10,
  },
})
