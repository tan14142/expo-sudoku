import { useEffect } from "react"
import { Pressable, StyleSheet, View, Text } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setStatus, setTimer } from "~/Store/Game"
import { Feather } from "@expo/vector-icons"

export default function Timer() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.game.status)
  const time = useAppSelector(state => state.game.time)
  const displayTimer = useAppSelector(state => state.settings.displayTimer)

  function convertTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  function toggle() {
    dispatch(setStatus(status === "running" ? "paused" : "running"))
  }

  useEffect(() => {
    // if (status = "running") {
    //   const timeout = setTimeout(() => {
    //     dispatch(setTimer(time + 1))
    //   }, 1000)
    //   return () => clearTimeout(timeout)
    // }
  }, [status, time])

  if (!displayTimer) {
    return null
  }

  return (
    <Pressable style={styles.container} onPress={toggle}>
      <View style={styles.iconWrapper}>
        <Feather name={status === "running" ? "pause" : "play"} size={26} />
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
