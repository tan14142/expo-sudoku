import { useEffect, useState } from "react"
import { Animated } from "react-native"
import { Glyth } from "~/Types"
import LogoIcon, { LogoIconProps } from "./LogoIcon"
import animate from "~/Animations"

export default function LogoAnimated(props: LogoIconProps) {
  const [curName, setCurName] = useState<Glyth>("checkbox-blank")
  const [rotateY, rotateYTiming] = animate(1000, ["0deg", "180deg"])
  const [scaleX, scaleXTiming, _, scaleXVal] = animate(1000, [1, -1])

  useEffect(() => {
    Animated.parallel([rotateYTiming, scaleXTiming]).start(({ finished }) => {
      if (finished) {
        rotateYTiming.reset()
        scaleXTiming.reset()
      }
    })

    const setNameHalfWay = scaleXVal.addListener(({ value }) => {
      if (value > 0.5) {
        setCurName(props.name)
        scaleXVal.removeListener(setNameHalfWay)
      }
    })

    return () => {
      rotateYTiming.stop()
      scaleXTiming.stop()
      scaleXVal.removeListener(setNameHalfWay)
    }
  }, [props.name])

  return (
    <Animated.View
      style={{
        margin: -6,
        transform: [{ rotateY }, { scaleX }],
      }}>
      <LogoIcon {...props} name={curName} />
    </Animated.View>
  )
}
