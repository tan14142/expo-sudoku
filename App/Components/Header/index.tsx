import { StyleSheet, Text, View } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import BackButton from "./Buttons/Back"
import GearButton from "./Buttons/Gear"
import PaletteButton from "./Buttons/Palette"
import ShareButton from "./Buttons/Export"
import MuteButton from "./Buttons/Mute"
import themes from "~/Themes"

export default function Header(
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>,
) {
  const theme = useAppSelector(state => state.settings.theme)
  const routeName = navRef.getCurrentRoute()!.name

  return (
    <View style={[styles.container, { backgroundColor: themes[theme].c0 }]}>
      <View style={styles.column}>
        {routeName !== "Menu" && <BackButton {...navRef} />}
        {routeName !== "Settings" && <GearButton {...navRef} />}
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
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  column: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})
