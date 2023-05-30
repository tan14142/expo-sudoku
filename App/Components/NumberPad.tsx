import { Dimensions, StyleSheet, View } from "react-native"
import NumberPadButton from "./NumberPadButton"

export default function NumberPad() {
  return (
    <>
      <View style={styles.row1}>
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <NumberPadButton key={i} value={i + 1} />
          ))}
      </View>
      <View style={styles.row2}>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <NumberPadButton key={i} value={i + 6} />
          ))}
      </View>
    </>
  )
}

const width = Dimensions.get("window").width * 0.1

const styles = StyleSheet.create({
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: width / 2,
    marginHorizontal: width / 4,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: width * 0.75,
  },
})
