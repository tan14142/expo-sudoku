import { View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { pushSelection, setStatus, clear, hint, reset, solve, undo } from "~/Store/Game"
import { checkSelection } from "~/Utils"
import { Glyth } from "~/Types"
import PressableFeature from "./Pressables/Feature"
import styles from "~/Styles"

interface FeaturePadProps {
  size: number
}

export default function FeaturePad({ size }: FeaturePadProps) {
  const dispatch = useAppDispatch()
  const selection = useAppSelector(state => state.game.selection, checkSelection)
  const displayHinter = useAppSelector(state => state.settings.displayHinter)
  const displaySolver = useAppSelector(state => state.settings.displaySolver)

  function handleClear() {
    if (!isNaN(selection)) {
      dispatch(pushSelection())
      dispatch(clear())
    }
  }

  function handleHint() {
    if (!isNaN(selection)) {
      dispatch(hint())
    }
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
        size={size}
        text="undo"
        handler={handleUndo}
      />
      <PressableFeature name={"eraser" as Glyth} size={size} text="clear" handler={handleClear} />
      <PressableFeature name={"restore" as Glyth} size={size} text="reset" handler={handleReset} />
      {displaySolver && (
        <PressableFeature
          name={"magic-staff" as Glyth}
          size={size}
          text="solve"
          handler={handleSolve}
        />
      )}
      {displayHinter && (
        <PressableFeature
          name={"lightbulb" as Glyth}
          size={size}
          text="hint"
          handler={handleHint}
        />
      )}
    </View>
  )
}
