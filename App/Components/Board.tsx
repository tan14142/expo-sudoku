import { createContext, useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import Cell from "./Cell"

interface BoardProps {
  board: number[]
}

export default function Board({ board }: BoardProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <View style={styles.board}>
      {board.map((value, index) => (
        <Cell
          key={index}
          {...{ index, selectedIndex, value, onPress: setSelectedIndex }}
        />
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
