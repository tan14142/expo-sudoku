import { StyleSheet, Text, Pressable, ViewStyle } from "react-native"
import { CellProps } from "./Cell"

export default function Cell({
  index,
  selectedIndex,
  value,
  onPress,
}: CellProps) {
  return (
    <Pressable
      onPress={() => onPress(index)}
      style={getPressableStyle(index, selectedIndex)}>
      <Text style={styles.text}>{value !== 0 ? value : ""}</Text>
    </Pressable>
  )
}

function getPressableStyle(index: number, selectedIndex: number) {
  const pressableStyles: ViewStyle[] = [styles.pressable]

  if (index === selectedIndex) {
    pressableStyles.push(styles.pressableSelected)
  } else if (
    Math.abs(selectedIndex - index) % 9 === 0 ||
    Math.floor(selectedIndex / 9) === Math.floor(index / 9)
  ) {
    pressableStyles.push(styles.pressableSelectedTrack)
  }

  return pressableStyles
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
  pressableSelectedTrack: {
    backgroundColor: "rgba(48, 125, 246, 0.1)",
  },
  text: {
    fontSize: 18,
  },
})
