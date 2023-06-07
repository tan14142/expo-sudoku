import { useRef } from "react"
import { Animated } from "react-native"

type ShakeXType = [Animated.AnimatedInterpolation<number>, () => void]

export default function shakeX(): ShakeXType {
  const translation = useRef(new Animated.Value(0)).current

  const trigger = () => {
    const duration = 250
    const keyframes = [
      { translateX: -1, duration: duration * 0.1 },
      { translateX: 2, duration: duration * 0.15 },
      { translateX: -4, duration: duration * 0.25 },
      { translateX: 4, duration: duration * 0.2 },
      { translateX: 0, duration: duration * 0.3 },
    ]

    Animated.sequence(
      keyframes.map(keyframe =>
        Animated.timing(translation, {
          toValue: keyframe.translateX,
          duration: keyframe.duration,
          useNativeDriver: true,
        }),
      ),
    ).start()
  }

  const interpolatedTranslation = translation.interpolate({
    inputRange: [-4, -1, 0, 2, 4],
    outputRange: [-4, -1, 0, 2, 4],
  })

  return [interpolatedTranslation, trigger]
}
