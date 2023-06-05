import { Animated, Pressable } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { Octicons } from "@expo/vector-icons"
import { buttonStyle } from "./Header"
import animate from "~/Animations"

export default function BackButton({
  goBack,
}: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>) {
  const [interpolation, timing] = animate(250, [1, 0])

  function handlePress() {
    setTimeout(() => goBack(), 250)
    timing.start(timing.reset)
  }

  return (
    <Pressable onPress={handlePress} style={buttonStyle}>
      <Animated.View style={{ opacity: interpolation }}>
        <Octicons name="chevron-left" size={24} />
      </Animated.View>
    </Pressable>
  )
}

// TODO: probably need page animation
// TODO: back button on game screen goes to splash
