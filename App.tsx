import { Provider } from "react-redux"
import { persistor, store } from "~/Store"
import { PersistGate } from "redux-persist/integration/react"
import { useFonts } from "expo-font"
import Navigator from "~/Navigator"

export default function App() {
  const [loaded] = useFonts({
    Poppins100: require("./assets/fonts/poppins/100.ttf"),
    Poppins200: require("./assets/fonts/poppins/200.ttf"),
    Poppins300: require("./assets/fonts/poppins/300.ttf"),
    Poppins400: require("./assets/fonts/poppins/400.ttf"),
    Poppins500: require("./assets/fonts/poppins/500.ttf"),
    Poppins600: require("./assets/fonts/poppins/600.ttf"),
    Poppins700: require("./assets/fonts/poppins/700.ttf"),
    Poppins800: require("./assets/fonts/poppins/800.ttf"),
    Poppins900: require("./assets/fonts/poppins/900.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Navigator />
      </PersistGate>
    </Provider>
  )
}
