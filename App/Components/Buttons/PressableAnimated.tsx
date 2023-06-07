import { ReactNode } from "react"
import { Animated, Pressable, ViewProps } from "react-native"
import animate from "~/Animations"
import styles from "~/Styles"

interface PressableAnimatedProps {
  children: ReactNode
  onPress: () => void
  style: Animated.AnimatedProps<ViewProps>["style"]
}

export default function PressableAnimated({ children, onPress, style }: PressableAnimatedProps) {
  const [elevation, timingElevation, reverseElevation] = animate(100, [
    styles.dropShadow.elevation,
    0,
  ])
  const [shadowRadius, timingShadowRadius, reverseRadius] = animate(100, [
    styles.dropShadow.shadowRadius,
    0,
  ])
  const [width, timingWidth, reverseWidth] = animate(100, [styles.dropShadow.shadowOffset.width, 0])
  const [translateY, timingTranslateY, reverseTranslateY] = animate(100, [
    0,
    styles.dropShadow.elevation / 2,
  ])

  function handlePress() {
    Animated.parallel([timingElevation, timingShadowRadius, timingWidth, timingTranslateY]).start(
      ({ finished }) => {
        if (finished) {
          onPress!()
          Animated.parallel([
            reverseElevation,
            reverseRadius,
            reverseWidth,
            reverseTranslateY,
          ]).start()
        }
      },
    )
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
        onPress={handlePress}
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
