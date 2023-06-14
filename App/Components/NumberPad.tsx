import { View } from "react-native"
import PressableNumber from "./Pressables/Number"
import PressableNote from "./Pressables/Note"
import styles from "~/Styles"

export default function NumberPad() {
  return (
    <>
      <View style={styles.row}>
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <PressableNumber key={i} value={i + 1} />
          ))}
      </View>
      <View style={styles.row}>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <PressableNumber key={i} value={i + 6} />
          ))}
        <PressableNote />
      </View>
    </>
  )
}
