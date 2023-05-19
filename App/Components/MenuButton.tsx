import { useAppSelector } from "~/Store"
import { Text, Pressable, StyleSheet } from "react-native"

interface MenuButtonProps {
  handler: () => void
  label: string
}

export default function MenuButton({ handler, label }: MenuButtonProps) {
  const { buttonBackgroundColor: backgroundColor, buttonTextColor: color } =
    useAppSelector(state => state.settings.theme)

  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={handler}>
      <Text selectable={false} style={[styles.text, { color }]}>
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: 8,
    textAlign: "center",
    height: 50,
    width: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

// const styles = StyleSheet.create({
//   container: {},
//   row: {
//     flexDirection: "row",
//   },
//   item: {
//     margin: 8,
//     height: 100,
//     width: 100,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 8,
//     backgroundColor: "#f2f2f2",
//   },
//   square: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#333",
//     borderRadius: 8,
//   },
// })
