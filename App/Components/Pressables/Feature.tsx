import { View } from "react-native"
import { useAppSelector } from "~/Store"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Glyth } from "~/Types"
import PressableAnimated from "./Animated"
import styles from "~/Styles"
import TextPoppins from "../TextPoppins"

interface PressableFeatureProps {
  name: Glyth
  size: number
  text: string
  handler: () => void
}

export default function PressableFeature({ name, size, text, handler }: PressableFeatureProps) {
  const theme = useAppSelector(state => state.settings.theme)

  return (
    <View
      style={{
        alignItems: "center",
      }}>
      <PressableAnimated
        evelation={2}
        style={[styles.pressableRound, { backgroundColor: theme.t, height: size, width: size }]}
        onPress={handler}>
        <MaterialCommunityIcons name={name} size={(size * 32) / 48} color={theme.tf} />
      </PressableAnimated>
      <TextPoppins
        style={{
          color: theme.p,
          fontSize: (size * 12) / 48,
          marginTop: 4,
        }}>
        {text}
      </TextPoppins>
    </View>
  )
}
