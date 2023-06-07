import { Animated, Pressable } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import animate from "~/Animations"
import styles from "~/Styles"

export default function BackButton({
  goBack,
}: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>) {
  const [interpolation, timing] = animate(250, [1, 0])

  function handlePress() {
    setTimeout(() => goBack(), 250)
    timing.start(timing.reset)
  }

  return (
    <Pressable onPress={handlePress} style={styles.headerButton}>
      <Animated.View style={{ opacity: interpolation }}>
        <MaterialCommunityIcons color="white" name="chevron-left" size={24} />
      </Animated.View>
    </Pressable>
  )
}

// TODO: probably need page animation
// TODO: back button on game screen goes to splash
