import { useEffect, useState } from "react"
import { Animated } from "react-native"
import { useAppSelector } from "~/Store"
import { Glyth } from "~/Types"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import animate from "~/Animations"

interface LogoAnimatedProps {
  name: Glyth
  size: number
}

export default function LogoAnimated({ name, size }: LogoAnimatedProps) {
  const [curName, setCurName] = useState<Glyth>("checkbox-blank")
  const theme = useAppSelector(state => state.settings.theme)
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
        setCurName(name)
        scaleXVal.removeListener(setNameHalfWay)
      }
    })

    return () => {
      rotateYTiming.stop()
      scaleXTiming.stop()
      scaleXVal.removeListener(setNameHalfWay)
    }
  }, [name])

  return (
    <Animated.View
      style={{
        height: size,
        width: size,
        transform: [{ rotateY }, { scale: 1.25 }, { scaleX }],
      }}>
      <MaterialCommunityIcons color={theme.p} name={curName} size={size} />
    </Animated.View>
  )
}
