import { View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { pushSelection, setStatus, clear, hint, reset, solve, undo } from "~/Store/Game"
import { checkSelection } from "~/Utils"
import { GlythType } from "./Logo"
import PressableFeature from "./Pressables/Feature"
import styles from "~/Styles"

export default function FeaturePad() {
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
    <View style={[styles.row, { marginTop: 20 }]}>
      <PressableFeature name={"undo-variant" as GlythType} text="undo" handler={handleUndo} />
      <PressableFeature name={"eraser" as GlythType} text="clear" handler={handleClear} />
      <PressableFeature name={"restore" as GlythType} text="reset" handler={handleReset} />
      {displaySolver && (
        <PressableFeature name={"magic-staff" as GlythType} text="solve" handler={handleSolve} />
      )}
      {displayHinter && (
        <PressableFeature name={"lightbulb" as GlythType} text="hint" handler={handleHint} />
      )}
    </View>
  )
}
