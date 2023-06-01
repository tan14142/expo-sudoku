import { Animated, Pressable, StyleSheet } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import { Octicons } from "@expo/vector-icons"
import animate from "~/Animations/fadeRotate"

export default function GearButton({
  getCurrentRoute,
  goBack,
  navigate,
}: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>) {
  const { buttonSymbolColor: color } = useAppSelector(state => state.settings.theme)

  const [opacity, rotate, trigger] = animate(1000, () => {
    getCurrentRoute()!.name === "Settings" ? goBack() : navigate("Settings")
  })

  return (
    <Pressable onPress={trigger} style={styles.button}>
      <Animated.View style={{ opacity, transform: [{ rotate }] }}>
        <Octicons name="gear" size={24} color={color} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
})

// TODO: turn symbol into back button when in settings
