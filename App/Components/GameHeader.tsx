import { View } from "react-native"
import { useAppSelector } from "~/Store"
import TextPoppins from "./TextPoppins"
import Timer from "~/Components/Timer"
import styles from "~/Styles"

export default function GameHeader() {
  const difficulty = useAppSelector(state => state.game.difficulty)
  const displayMistakes = useAppSelector(state => state.settings.displayMistakes)
  const count = useAppSelector(state => state.game.mistakes)
  const limit = useAppSelector(state => state.settings.mistakes)

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <TextPoppins style={{ fontSize: 12 }}>{difficulty}</TextPoppins>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Timer />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end", opacity: +displayMistakes }}>
        <TextPoppins style={{ fontSize: 12 }}>
          Mistakes: {limit}/{limit}
        </TextPoppins>
      </View>
    </View>
  )
}
// TODO: mistakes, responsiveness
