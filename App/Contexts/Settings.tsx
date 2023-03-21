import { createContext, ReactNode, useState } from "react"

enum Themes {
  dark = "dark",
  light = "light",
}

type SettingsProps = {
  onFillRemoveNotes: boolean
  onMarkPreventError: boolean
  onSelectHighlightRowAndColumn: boolean
  onSelectHighlightSameNumber: boolean
  onSelectGreyOutUsedNumber: boolean
  theme: Themes
  timer: boolean
}

const defaultSetting: SettingsProps = {
  onFillRemoveNotes: true,
  onMarkPreventError: true,
  onSelectHighlightRowAndColumn: true,
  onSelectHighlightSameNumber: true,
  onSelectGreyOutUsedNumber: true,
  theme: Themes.dark,
  timer: true,
}

type SettingsContextProps = { children: ReactNode }

export const SettingsContext = createContext({
  settings: defaultSetting,
})

const SettingsContextProvider = ({ children }: SettingsContextProps) => {
  const [state, setState] = useState(defaultSetting)
  const value = {
    settings: state,
    set: <K extends keyof SettingsProps>(prop: K, val: SettingsProps[K]) =>
      setState({
        ...state,
        [prop]: val,
      }),
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider
