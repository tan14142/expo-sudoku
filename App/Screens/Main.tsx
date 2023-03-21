import { View, Text, Pressable, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ButtonProps {
  handler: () => void
  icon: JSX.Element
  label: string
}

const MenuItem = ({ handler, icon, label }: ButtonProps) => (
  <Pressable style={styles.item} onPress={handler}>
    {icon}
    <Text>{label}</Text>
  </Pressable>
)

export default () => (
  <View style={styles.container}>
    <MenuItem
      handler={() => console.log(123)}
      icon={<Feather name="play" />}
      label="Resume"
    />
    <MenuItem
      handler={() => console.log(123)}
      icon={<Feather name="zap" />}
      label="Today's Puzzle"
    />
    <MenuItem
      handler={() => console.log(123)}
      icon={<Feather name="play" />}
      label="New Game"
    />
    <MenuItem
      handler={() => console.log(123)}
      icon={<Feather name="star" />}
      label="Favorites"
    />
    <MenuItem
      handler={() => console.log(123)}
      icon={<Feather name="sliders" />}
      label="Custom Game"
    />
    <MenuItem
      handler={() => console.log(123)}
      icon={<Feather name="settings" />}
      label="Settings"
    />
  </View>
)

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
  },
  item: {
    margin: 8,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    borderRadius: 8,
  },
})
