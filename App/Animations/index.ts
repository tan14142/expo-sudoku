import { useRef } from "react"
import { Animated } from "react-native"

type Return = [
  Animated.AnimatedInterpolation<number>,
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
  Animated.Value,
]

export default function animate(duration: number, outputRange: number[] | string[]): Return {
  const val = useRef(new Animated.Value(0)).current

  const animate = val.interpolate({
    inputRange: Array.from({ length: outputRange.length }, (_, i) => i),
    outputRange,
  })

  const timing = Animated.timing(val, {
    toValue: outputRange.length - 1,
    duration,
    useNativeDriver: true,
  })

  const reverse = Animated.timing(val, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  })

  return [animate, timing, reverse, val]
}
