import { useEffect, useState } from "react"
import { StatusBar } from "react-native"
import { Provider } from "react-redux"
import { store } from "~/Store"
import Navigator from "~/Navigator"
import Splash from "~/Screens/Splash"

export default function App() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    StatusBar.setHidden(true)
  }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false)
  //   }, 1000)

  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <Provider store={store}>{showSplash ? <Splash /> : <Navigator />}</Provider>
  )
}
