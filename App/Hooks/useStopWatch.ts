import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setRunning, setTime } from "~/Store/Game"

export default function useStopwatch() {
  const dispatch = useAppDispatch()
  const { running, time } = useAppSelector(state => state.game)

  function pause() {
    dispatch(setRunning(false))
  }

  function start() {
    dispatch(setRunning(true))
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

  return {
    time,
    running,
    pause,
    start,
    toggle,
  }
}
