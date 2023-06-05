import { Animated, Pressable } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import { Octicons } from "@expo/vector-icons"
import { buttonStyle } from "./Header"
import animate from "~/Animations/"

export default function GearButton({
  navigate,
}: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>) {
  const { buttonSymbolColor: color } = useAppSelector(state => state.settings.theme)
  const [opacity, opacityTiming] = animate(500, [1, 0])
  const [rotate, rotateTiming] = animate(500, ["0deg", "180deg"])

  function handlePress() {
    Animated.parallel([opacityTiming, rotateTiming]).start(() => navigate("Settings"))
  }

  return (
    <Pressable onPress={handlePress} style={buttonStyle}>
      <Animated.View style={{ opacity, transform: [{ rotate }] }}>
        <Octicons name="gear" size={24} color={color} />
      </Animated.View>
    </Pressable>
  )
}
