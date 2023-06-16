import { Animated, Pressable } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import animate from "~/Animations/"
import styles from "~/Styles"

export default function GearButton({
  navigate,
}: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>) {
  const [opacity, opacityTiming] = animate(500, [1, 0])
  const [rotate, rotateTiming] = animate(500, ["0deg", "180deg"])

  function handlePress() {
    Animated.parallel([opacityTiming, rotateTiming]).start(() => navigate("Settings"))
  }

  return (
    <Pressable onPress={handlePress} style={styles.headerButton}>
      <Animated.View style={{ opacity, transform: [{ rotate }] }}>
        <MaterialCommunityIcons color="white" name="cog" size={24} />
      </Animated.View>
    </Pressable>
  )
}
