import { View } from "react-native"
import { useAppSelector } from "~/Store"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { GlythType } from "../Logo"
import PressableAnimated from "./Animated"
import styles from "~/Styles"
import TextPoppins from "../TextPoppins"

interface PressableFeatureProps {
  name: GlythType
  text: string
  handler: () => void
}

export default function PressableFeature({ name, text, handler }: PressableFeatureProps) {
  const theme = useAppSelector(state => state.settings.theme)

  function handlePress() {
    handler()
  }

  return (
    <View
      style={{
        alignItems: "center",
      }}>
      <PressableAnimated
        evelation={2}
        style={[styles.pressableRound, { backgroundColor: theme.t }]}
        onPress={handlePress}>
        <MaterialCommunityIcons name={name} size={32} color={theme.tf} />
      </PressableAnimated>
      <TextPoppins
        style={{
          color: theme.p,
          marginTop: 4,
        }}>
        {text}
      </TextPoppins>
    </View>
  )
}
