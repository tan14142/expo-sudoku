import { useEffect } from "react"
import { Pressable } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setStatus, setTimer } from "~/Store/Game"
import TextPoppins from "./TextPoppins"

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
    if (status === "running") {
      const timeout = setTimeout(() => {
        dispatch(setTimer(time + 1))
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [status, time])

  if (!displayTimer) {
    return null
  }

  return (
    <Pressable onPress={toggle}>
      <TextPoppins style={{ fontSize: 12 }}>{convertTime(time)}</TextPoppins>
    </Pressable>
  )
}
