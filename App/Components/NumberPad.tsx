import { View } from "react-native"
import PressableNumber from "./Pressables/Number"
import PressableNote from "./Pressables/Note"
import styles from "~/Styles"

interface NumberPadProps {
  size: number
}

export default function NumberPad({ size }: NumberPadProps) {
  return (
    <>
      <View style={styles.row}>
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <PressableNumber key={i} size={size} value={i + 1} />
          ))}
      </View>
      <View style={styles.row}>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <PressableNumber key={i} size={size} value={i + 6} />
          ))}
        <PressableNote size={size} />
      </View>
    </>
  )
}
