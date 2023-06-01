import { useRef } from "react"
import { Animated } from "react-native"

type Return = [
  Animated.AnimatedInterpolation<number>,
  Animated.CompositeAnimation,
]

export default function animate(duration: number, outputRange: number[] | string[]): Return {
  const val = useRef(new Animated.Value(0)).current

  const animate = val.interpolate({
    inputRange: [0, 1],
    outputRange,
  })

  const timing = Animated.timing(val, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  })

  return [animate, timing]
}
