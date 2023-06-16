import { View } from "react-native"
import PressableNumber from "./Pressables/Number"
import PressableNote from "./Pressables/Note"
import styles from "~/Styles"

interface NumberPadProps {
  width: number
}

export default function NumberPad({ width }: NumberPadProps) {
  return (
    <>
      <View style={styles.row}>
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <PressableNumber key={i} width={width} value={i + 1} />
          ))}
      </View>
      <View style={styles.row}>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <PressableNumber key={i} width={width} value={i + 6} />
          ))}
        <PressableNote width={width} />
      </View>
    </>
  )
}
