import { View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { pushSelection, setStatus, clear, hint, reset, solve, undo } from "~/Store/Game"
import { Glyth } from "~/Types"
import PressableFeature from "./Pressables/Feature"
import styles from "~/Styles"

interface FeaturePadProps {
  width: number
}

export default function FeaturePad({ width }: FeaturePadProps) {
  const dispatch = useAppDispatch()
  const displayHinter = useAppSelector(state => state.settings.displayHinter)
  const displaySolver = useAppSelector(state => state.settings.displaySolver)

  function handleClear() {
    dispatch(pushSelection())
    dispatch(clear())
  }

  function handleHint() {
    dispatch(hint())
  }

  function handleReset() {
    dispatch(reset())
  }

  function handleSolve() {
    dispatch(setStatus("paused"))
    dispatch(solve())
  }

  function handleUndo() {
    dispatch(undo())
  }

  return (
    <View style={[styles.row, { marginTop: 16, marginBottom: 8 }]}>
      <PressableFeature
        name={"undo-variant" as Glyth}
        width={width}
        text="undo"
        handler={handleUndo}
      />
      <PressableFeature name={"eraser" as Glyth} width={width} text="clear" handler={handleClear} />
      <PressableFeature
        name={"restore" as Glyth}
        width={width}
        text="reset"
        handler={handleReset}
      />
      {displaySolver && (
        <PressableFeature
          name={"magic-staff" as Glyth}
          width={width}
          text="solve"
          handler={handleSolve}
        />
      )}
      {displayHinter && (
        <PressableFeature
          name={"lightbulb" as Glyth}
          width={width}
          text="hint"
          handler={handleHint}
        />
      )}
    </View>
  )
}
