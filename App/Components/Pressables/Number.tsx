import { StyleSheet, Vibration } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { pushLinks, pushSelection, removeLinkedNotes, setNote, setNum } from "~/Store/Game"
import PressableAnimated from "./Animated"
import styles from "~/Styles"
import TextPoppins from "../TextPoppins"
import useSound from "~/Hooks/useSound"

interface PressableNumberProps {
  value: number
  width: number
}

export default function PressableNumber({ value, width }: PressableNumberProps) {
  const dispatch = useAppDispatch()
  const selection = useAppSelector(state => state.game.selection)
  const num = useAppSelector(state => state.game.board[selection]?.num)
  const init = useAppSelector(state => state.game.board[selection]?.init)
  const solution = useAppSelector(state => state.game.board[selection]?.solution)
  const notesEnabled = useAppSelector(state => state.game.notesEnabled)
  const solved = useAppSelector(state => state.game.solved[value])
  const whitelist = useAppSelector(state => state.game.whitelist[value])
  const highlightMistake = useAppSelector(state => state.settings.highlightMistake)
  const lowlightInvalidInput = useAppSelector(state => state.settings.lowlightInvalidInput)
  const lowlightSolvedNumbers = useAppSelector(state => state.settings.lowlightSolvedNumbers)
  const removeNotesAutomatically = useAppSelector(state => state.settings.removeNotesAutomatically)
  const theme = useAppSelector(state => state.settings.theme)
  const vibration = useAppSelector(state => state.settings.vibration)
  const isWhitelisted = lowlightInvalidInput ? whitelist : !solved
  const playSound = useSound()
  const fontSize = (width * 24) / 48

  const isBlacklisted = (() => {
    if (init) {
      return true
    }
    if (!(lowlightInvalidInput || lowlightSolvedNumbers)) {
      return false
    }
    return !isWhitelisted || (highlightMistake && num === solution)
  })()

  function handlePress(isLongPress = false) {
    if (!isNaN(selection) && !init && (isLongPress || !isBlacklisted)) {
      if (notesEnabled) {
        dispatch(pushSelection())
        dispatch(setNote(value))
        playSound("pencil2")
      } else if (num !== value) {
        dispatch(pushSelection())
        dispatch(setNum(value))

        if (value !== solution && (highlightMistake || isBlacklisted)) {
          playSound("mistake")
          vibration && Vibration.vibrate()
          return
        }

        playSound("pen2")

        if (removeNotesAutomatically) {
          dispatch(pushLinks())
          dispatch(removeLinkedNotes())
        }
      }
    }
  }

  return (
    <PressableAnimated
      style={[
        { backgroundColor: theme.s, height: width, width },
        styles.pressableRound,
        isBlacklisted && style.blacklisted,
        solved && style.solved,
        notesEnabled && style.notesEnabled,
      ]}
      onPress={() => handlePress()}
      onLongPress={() => handlePress(true)}>
      <TextPoppins style={{ color: theme.sf, fontSize }}>{value}</TextPoppins>
    </PressableAnimated>
  )
}

const style = StyleSheet.create({
  blacklisted: {
    opacity: 0.5,
  },
  solved: {
    opacity: 0.1,
  },
  notesEnabled: {
    backgroundColor: "#888888",
  },
})
