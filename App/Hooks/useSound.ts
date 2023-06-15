import { useEffect } from "react"
import { Audio } from "expo-av"
import click from "~/../assets/sounds/click.mp3"
import eraser from "~/../assets/sounds/eraser.mp3"
import lose from "~/../assets/sounds/lose.mp3"
import mistake from "~/../assets/sounds/mistake.mp3"
import navigate from "~/../assets/sounds/navigate.mp3"
import penCheck from "~/../assets/sounds/pen_check.mp3"
import penClick from "~/../assets/sounds/pen_click.mp3"
import pen1 from "~/../assets/sounds/pen1.mp3"
import pen2 from "~/../assets/sounds/pen2.mp3"
import pencilCheck from "~/../assets/sounds/pencil_check.mp3"
import pencil1 from "~/../assets/sounds/pencil1.mp3"
import pencil2 from "~/../assets/sounds/pencil2.mp3"
import solve from "~/../assets/sounds/solve.mp3"
import tick from "~/../assets/sounds/tick.mp3"
import tock from "~/../assets/sounds/tock.mp3"
import undo from "~/../assets/sounds/undo.mp3"
import { useAppSelector } from "~/Store"

const sounds = {
  click,
  eraser,
  lose,
  navigate,
  mistake,
  penCheck,
  penClick,
  pen1,
  pen2,
  pencilCheck,
  pencil1,
  pencil2,
  solve,
  tick,
  tock,
  undo,
}

export type Sounds = keyof typeof sounds

export default function useSound() {
  const enabled = useAppSelector(state => state.settings.sound)
  let sound: Audio.Sound

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [])

  return async (key: Sounds) => {
    if (enabled) {
      sound = (await Audio.Sound.createAsync(sounds[key])).sound
      sound.playAsync()
    }
  }
}
