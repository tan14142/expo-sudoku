import { StyleSheet, View } from "react-native"
import Cell from "./Cell"

export default function Board() {
  return (
    <View style={styles.board}>
      {Array(81)
        .fill(true)
        .map((_, i) => (
          <Cell key={i} index={i} />
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",

    borderColor: "#D7E1F4",
    borderRadius: 10,
    borderWidth: 4,

    elevation: 16,
    shadowColor: "#D7E1F4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
  },
})
