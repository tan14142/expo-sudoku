import { View } from "react-native"
import { useAppSelector } from "~/Store"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Glyth } from "~/Types"
import PressableAnimated from "./Animated"
import styles from "~/Styles"
import TextPoppins from "../TextPoppins"

interface PressableFeatureProps {
  name: Glyth
  text: string
  width: number
  handler: () => void
}

export default function PressableFeature({ name, text, width, handler }: PressableFeatureProps) {
  const theme = useAppSelector(state => state.settings.theme)
  const fontSize = (width * 12) / 48

  return (
    <View
      style={{
        alignItems: "center",
      }}>
      <PressableAnimated
        evelation={2}
        style={[styles.pressableRound, { backgroundColor: theme.t, height: width, width }]}
        onPress={handler}>
        <MaterialCommunityIcons name={name} size={fontSize} color={theme.tf} />
      </PressableAnimated>
      <TextPoppins
        style={{
          color: theme.p,
          fontSize,
          marginTop: 4,
        }}>
        {text}
      </TextPoppins>
    </View>
  )
}
