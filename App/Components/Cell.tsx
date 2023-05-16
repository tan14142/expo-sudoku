import { Dimensions, StyleSheet, View, ViewStyle } from "react-native"
import CellButton from "./CellButton"

export interface CellProps {
  index: number
  selectedIndex: number
  value: number | number[]
  onPress: (index: number) => void
}

export default function Cell(props: CellProps) {
  return (
    <View style={getCellStyles(props.index)}>
      <CellButton {...props} />
    </View>
  )
}

function getCellStyles(index: number) {
  const cellStyles: ViewStyle[] = [styles.cell]

  if ((index > 26 && index < 36) || (index > 53 && index < 63)) {
    cellStyles.push(styles.borderTop)
  }

  if (index % 9 !== 0 && index % 3 === 0) {
    cellStyles.push(styles.borderLeft)
  }

  if (index < 9) {
    cellStyles.push(styles.borderTopNone)
  }

  if (index % 9 === 8) {
    cellStyles.push(styles.borderRightNone)
  }

  if (index > 71) {
    cellStyles.push(styles.borderBottomNone)
  }

  if (index % 9 === 0) {
    cellStyles.push(styles.borderLeftNone)
  }

  return cellStyles
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  borderBottomNone: {
    borderBottomWidth: 0,
  },
  borderLeft: {
    borderLeftWidth: 3,
  },
  borderLeftNone: {
    borderLeftWidth: 0,
  },
  borderRightNone: {
    borderRightWidth: 0,
  },
  borderTop: {
    borderTopWidth: 3,
  },
  borderTopNone: {
    borderTopWidth: 0,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#D7E1F4",
    height: width * 0.1,
    width: width * 0.1,
  },
})
