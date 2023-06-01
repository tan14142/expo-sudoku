import { useRef } from "react"
import { Animated } from "react-native"

type Return = [
  Animated.AnimatedInterpolation<number>,
  Animated.AnimatedInterpolation<number>,
  () => void,
]

export default function fadeRotate(duration: number, callback: () => void): Return {
  const val1 = useRef(new Animated.Value(0)).current
  const val2 = useRef(new Animated.Value(0)).current

  const rotate = val1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const opacity = val1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  })

  function trigger() {
    Animated.timing(val1, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      val1.setValue(0)
    })
    Animated.timing(val2, {
      toValue: 1,
      duration: duration / 2,
      useNativeDriver: true,
    }).start(() => {
      val2.setValue(0)
      callback()
    })
  }

  return [opacity, rotate, trigger]
}
