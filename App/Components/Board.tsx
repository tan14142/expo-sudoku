import { StyleSheet, View } from "react-native"
import { CellType } from "~/Types"
import Cell from "./Cell"

interface BoardProps {
  cells: CellType[]
}

export default function Board({ cells }: BoardProps) {
  return (
    <View style={styles.board}>
      {cells.map((value, index) => (
        <Cell key={index} {...{ index, value }} />
      ))}
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

    // drop shadow
    elevation: 16,
    shadowColor: "#D7E1F4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
  },
})
