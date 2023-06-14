import { ReactNode } from "react"
import { Animated, Pressable, ViewProps } from "react-native"
import animate from "~/Animations"
import styles from "~/Styles"
import useSound, { SoundsType } from "~/Hooks/useSound"

interface PressableAnimatedProps {
  children: ReactNode
  evelation?: number
  sound?: string
  style: Animated.AnimatedProps<ViewProps>["style"]
  onPress: () => void
  onLongPress?: () => void
}

export default function PressableAnimated({
  children,
  evelation = 1,
  sound = "tick",
  style,
  onPress,
  onLongPress,
}: PressableAnimatedProps) {
  const [elevation, timingElevation, reverseElevation] = animate(100, [evelation, 0])
  const [shadowRadius, timingShadowRadius, reverseRadius] = animate(100, [evelation * 2, 0])
  const [width, timingWidth, reverseWidth] = animate(100, [evelation, 0])
  const [translateY, timingTranslateY, reverseTranslateY] = animate(100, [0, evelation / 2])
  const playSound = useSound()

  function handlePress(handler: () => void) {
    Animated.parallel([timingElevation, timingShadowRadius, timingWidth, timingTranslateY]).start(
      ({ finished }) => {
        if (finished) {
          handler()
          Animated.parallel([
            reverseElevation,
            reverseRadius,
            reverseWidth,
            reverseTranslateY,
          ]).start()
        }
      },
    )

    playSound(sound as SoundsType)
  }

  return (
    <Animated.View
      style={[
        style,
        {
          elevation,
          shadowRadius,
          shadowOffset: { height: elevation, width },
          transform: [{ translateY }],
        },
      ]}>
      <Pressable
        onPress={() => handlePress(onPress)}
        onLongPress={() => onLongPress && handlePress(onLongPress)}
        style={[
          styles.center,
          {
            flex: 1,
            width: "100%",
          },
        ]}>
        {children}
      </Pressable>
    </Animated.View>
  )
}
