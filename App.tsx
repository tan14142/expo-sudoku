import { StatusBar } from "expo-status-bar"
import SettingsContextProvider from "~/Contexts/Settings"
import Navigator from "~/Navigator"

export default function App() {
  return (
    <SettingsContextProvider>
      <StatusBar style="auto" />
      <Navigator />
    </SettingsContextProvider>
  )
}
