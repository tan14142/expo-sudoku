import { StyleSheet, View } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import BackButton from "./Buttons/Back"
import GearButton from "./Buttons/Gear"
import PaletteButton from "./Buttons/Palette"
import ShareButton from "./Buttons/Export"
import MuteButton from "./Buttons/Mute"
import styles from "~/Styles"

export default function Header(
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>,
) {
  const theme = useAppSelector(state => state.settings.theme)
  const routeName = navRef.getCurrentRoute()!.name

  return (
    <View style={[styles.padding, { backgroundColor: theme.p, flexDirection: "row" }]}>
      <View style={style.column}>
        {routeName !== "Menu" && <BackButton {...navRef} />}
        {routeName !== "Settings" && <GearButton {...navRef} />}
      </View>
      <View style={[style.column, { justifyContent: "flex-end" }]}>
        {routeName === "Game" && <ShareButton />}
        <PaletteButton />
        <MuteButton />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: "row",
  },
})
