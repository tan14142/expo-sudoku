import { useEffect } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "~/Store"
import SelectionProvider from "~/Contexts/Selection"
import useStopwatch from "~/Hooks/useStopWatch"
import GameHeader from "~/Components/GameHeader"
import Board from "~/Components/Board"
import FeaturePad from "~/Components/FeaturePad"
import NumberPad from "~/Components/NumberPad"

export default function Game() {
  const navigation = useNavigation()
  const { cells } = useAppSelector(state => state.game)
  const { pause, start } = useStopwatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      start()
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      pause()
    })

    return unsubscribe
  }, [])

  return (
    <SelectionProvider>
      <View style={styles.container}>
        <GameHeader />
        <Board cells={cells} />
        <FeaturePad />
        <NumberPad />
      </View>
    </SelectionProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9 + 8,
  },
})

// TODO: make notes number font smaller!
// TODO: on error highlight red 3x3, row or column if option is true
