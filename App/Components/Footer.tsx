import { StyleSheet, View } from "react-native"
import GearButton, { GearButtonProps } from "./GearButton"
import PaletteButton from "./PaletteButton"
import MuteButton from "./MuteButton"
import { useAppSelector } from "~/Store"

export default function Footer(props: GearButtonProps) {
  const { buttonBackgroundColor: backgroundColor } = useAppSelector(
    state => state.settings.theme,
  )

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GearButton {...props} />
      <View style={{ flex: 1 }} />
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
