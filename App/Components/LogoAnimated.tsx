import { useEffect, useState } from "react"
import { Animated } from "react-native"
import animate from "~/Animations"
import LogoIcon, { LogoIconProps } from "./LogoIcon"

export default function LogoAnimated(props: LogoIconProps) {
  const [prevName, setPrevName] = useState(props.name)
  const [rotateY, rotateYTiming] = animate(1000, ["0deg", "180deg"])
  const [scaleX, scaleXTiming] = animate(1000, [1, -1])

  useEffect(() => {
    setTimeout(() => {
      setPrevName(props.name)
    }, 500)

    Animated.parallel([rotateYTiming, scaleXTiming]).start(({ finished }) => {
      if (finished) {
        rotateYTiming.reset()
        scaleXTiming.reset()
      }
    })
  }, [props.name])

  return (
    <Animated.View style={{ margin: -6, transform: [{ rotateY }, { scaleX }] }}>
      <LogoIcon {...props} name={prevName} />
    </Animated.View>
  )
}
