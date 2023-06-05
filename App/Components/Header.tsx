import { StyleSheet, Text, View } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import BackButton from "./BackButton"
import GearButton from "./GearButton"
import PaletteButton from "./PaletteButton"
import ShareButton from "./ExportButton"
import MuteButton from "./MuteButton"

export default function Header(
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>,
) {
  const { buttonBackgroundColor: backgroundColor } = useAppSelector(state => state.settings.theme)
  const routeName = navRef.getCurrentRoute()!.name

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.column}>
        {routeName !== "Splash" && <BackButton {...navRef} />}
        {routeName !== "Settings" && <GearButton {...navRef} />}
      </View>
      <View style={[styles.column, { justifyContent: "center" }]}>
        <Text selectable={false} style={styles.text}>
          {routeName}
        </Text>
      </View>
      <View style={[styles.column, { justifyContent: "flex-end" }]}>
        {routeName === "Game" && <ShareButton />}
        <PaletteButton />
        <MuteButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 17,
  },
  column: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    width: 24,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export const buttonStyle = styles.button

// TODO: make background look better
