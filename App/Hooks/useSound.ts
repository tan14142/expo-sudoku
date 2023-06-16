import { useEffect } from "react"
import { Audio } from "expo-av"
import { useAppSelector } from "~/Store"

const sounds = {
  click: require("~/../assets/sounds/click.mp3"),
  eraser: require("~/../assets/sounds/eraser.mp3"),
  lose: require("~/../assets/sounds/lose.mp3"),
  navigate: require("~/../assets/sounds/navigate.mp3"),
  mistake: require("~/../assets/sounds/mistake.mp3"),
  penCheck: require("~/../assets/sounds/pen_check.mp3"),
  penClick: require("~/../assets/sounds/pen_click.mp3"),
  pen1: require("~/../assets/sounds/pen1.mp3"),
  pen2: require("~/../assets/sounds/pen2.mp3"),
  pencilCheck: require("~/../assets/sounds/pencil_check.mp3"),
  pencil1: require("~/../assets/sounds/pencil1.mp3"),
  pencil2: require("~/../assets/sounds/pencil2.mp3"),
  solve: require("~/../assets/sounds/solve.mp3"),
  tick: require("~/../assets/sounds/tick.mp3"),
  tock: require("~/../assets/sounds/tock.mp3"),
  undo: require("~/../assets/sounds/undo.mp3"),
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
