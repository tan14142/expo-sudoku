import { useAppDispatch, useAppSelector } from "~/Store"
import { setNotesEnabled } from "~/Store/Game"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import PressableAnimated from "./Animated"
import styles from "~/Styles"
import useSound from "~/Hooks/useSound"

interface PressableNoteProps {
  size: number
}

export default function PressableNote({ size }: PressableNoteProps) {
  const dispatch = useAppDispatch()
  const notesEnabled = useAppSelector(state => state.game.notesEnabled)
  const theme = useAppSelector(state => state.settings.theme)
  const playSound = useSound()

  function handleNotes() {
    dispatch(setNotesEnabled(!notesEnabled))
    playSound(notesEnabled ? "penCheck" : "pencilCheck")
  }

  return (
    <PressableAnimated
      evelation={2}
      style={[
        styles.pressableRound,
        { backgroundColor: theme.s, opacity: notesEnabled ? 1 : 0.5, height: size, width: size },
      ]}
      onPress={handleNotes}>
      <MaterialCommunityIcons name="pencil-outline" size={(size * 32) / 48} color={theme.sf} />
    </PressableAnimated>
  )
}
