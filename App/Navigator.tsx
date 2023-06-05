import { useState } from "react"
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Game from "~/Screens/Game"
import Menu from "~/Screens/Menu"
import Settings from "~/Screens/Settings"
import Header from "./Components/Header"

type RootStackParamList = {
  Game: undefined
  Menu: undefined
  Settings: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const Stack = createNativeStackNavigator<RootStackParamList>()

export default () => {
  const [isReady, setIsReady] = useState(false)
  const navRef = useNavigationContainerRef()

  return (
    <NavigationContainer ref={navRef} onReady={() => setIsReady(true)}>
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
          header: () => isReady && <Header {...navRef} />,
        }}>
        <Stack.Screen component={Menu} name="Menu" />
        <Stack.Screen component={Game} name="Game" />
        <Stack.Screen component={Settings} name="Settings" />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// TODO: add all screens, RootStackParamList
