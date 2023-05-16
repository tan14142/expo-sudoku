import { StyleSheet, Text, View } from "react-native"
import { NavigationContainerRefWithCurrent } from "@react-navigation/native"
import GearButton from "./GearButton"
import PaletteButton from "./PaletteButton"
import MuteButton from "./MuteButton"
import { useAppSelector } from "~/Store"
import { useEffect } from "react"

export default function Header(
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>,
) {
  const { buttonBackgroundColor: backgroundColor } = useAppSelector(
    state => state.settings.theme,
  )

  const title =
    navRef.isReady() && navRef.getCurrentRoute()?.name === "Settings"
      ? "Settings"
      : ""

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GearButton {...navRef} />
      <View style={{ flex: 1, marginLeft: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          {title}
        </Text>
      </View>
      <PaletteButton />
      <MuteButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 17,
  },
})

// TODO: make background look better
