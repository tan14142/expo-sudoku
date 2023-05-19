import { Pressable, StyleSheet, View, Text } from "react-native"
import useStopwatch from "~/Hooks/useStopWatch"
import { Feather } from "@expo/vector-icons"

export default function Timer() {
  const { time, running, toggle } = useStopwatch()

  function convertTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Pressable style={styles.container} onPress={toggle}>
      <View style={styles.iconWrapper}>
        <Feather name={running ? "pause" : "play"} size={26} />
      </View>
      <Text selectable={false} style={styles.text}>
        {convertTime(time)}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
  },
  text: {
    fontFamily: "monospace",
    fontSize: 24,
    fontWeight: "500",
  },
})
