import { Animated, Pressable, StyleSheet } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { useAppSelector } from "~/Store"
import animate from "~/Animations"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"

export type GearButtonProps = {
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
}

export default function GearButton({
  navRef: { goBack, navigate, getCurrentRoute },
}: GearButtonProps) {
  const { buttonSymbolColor: color } = useAppSelector(
    state => state.settings.theme,
  )

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
