import { View, ViewStyle } from "react-native"
import { useAppSelector } from "~/Store"
import { BoardProps } from "~/Components/Board"
import { CellProps } from "~/Types"
import CellAnimated from "./Animated"

export default function Cell({ index, size }: BoardProps & CellProps) {
  const theme = useAppSelector(state => state.settings.theme)

  function getCellStyles(index: number) {
    const cellStyles: ViewStyle[] = [
      { borderColor: theme.p, borderWidth: 1, height: size, width: size },
    ]

    if ((index > 26 && index < 36) || (index > 53 && index < 63)) {
      cellStyles.push({
        borderTopWidth: 3,
      })
    }

    if (index % 9 !== 0 && index % 3 === 0) {
      cellStyles.push({
        borderLeftWidth: 3,
      })
    }

    if (index < 9) {
      cellStyles.push({
        borderTopWidth: 0,
      })
    }

    if (index % 9 === 8) {
      cellStyles.push({
        borderRightWidth: 0,
      })
    }

    if (index > 71) {
      cellStyles.push({
        borderBottomWidth: 0,
      })
    }

    if (index % 9 === 0) {
      cellStyles.push({
        borderLeftWidth: 0,
      })
    }

    return cellStyles
  }

  return (
    <View style={getCellStyles(index)}>
      <CellAnimated index={index} />
    </View>
  )
}
