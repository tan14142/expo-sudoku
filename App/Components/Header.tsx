import { View } from "react-native"
import { useAppSelector } from "~/Store"
import TextPoppins from "./TextPoppins"
import Timer from "~/Components/Timer"
import styles from "~/Styles"

interface HeaderProps {
  width: number
}

export default function Header({ width }: HeaderProps) {
  const difficulty = useAppSelector(state => state.game.difficulty)
  const displayMistakes = useAppSelector(state => state.settings.displayMistakes)
  const count = useAppSelector(state => state.game.mistakes)
  const limit = useAppSelector(state => state.settings.mistakes)
  const fontSize = ((width * 12) / 284) | 0

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <TextPoppins style={{ fontSize }}>{difficulty}</TextPoppins>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Timer fontSize={fontSize} />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end", opacity: +displayMistakes }}>
        <TextPoppins style={{ fontSize }}>
          Mistakes: {limit}/{limit}
        </TextPoppins>
      </View>
    </View>
  )
}
// TODO: mistakes
