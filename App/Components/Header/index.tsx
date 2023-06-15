import { StatusBar, StyleSheet, View } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import { SafeAreaView } from "react-native-safe-area-context"
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
    <SafeAreaView style={[styles.padding, { backgroundColor: theme.p, flexDirection: "row" }]}>
      <StatusBar barStyle="light-content" />
      <View style={style.column}>
        {routeName !== "Menu" && <BackButton {...navRef} />}
        {routeName !== "Settings" && <GearButton {...navRef} />}
      </View>
      <View style={[style.column, { justifyContent: "flex-end" }]}>
        {routeName === "Game" && <ShareButton />}
        <PaletteButton />
        <MuteButton />
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: "row",
  },
})
