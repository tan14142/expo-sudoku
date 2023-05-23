import { useEffect } from "react"
import { Pressable, StyleSheet, View, Text } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setRunning, setTime } from "~/Store/Game"
import { Feather } from "@expo/vector-icons"

export default function Timer() {
  const dispatch = useAppDispatch()
  const displayTimer = useAppSelector(state => state.settings.displayTimer)
  const { running, time } = useAppSelector(state => state.game)
  
  function convertTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  function toggle() {
    dispatch(setRunning(!running))
  }

  useEffect(() => {
    if (running) {
      const timeout = setTimeout(() => {
        dispatch(setTime(time + 1))
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [running, time])

  if (!displayTimer) {
    return null
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
