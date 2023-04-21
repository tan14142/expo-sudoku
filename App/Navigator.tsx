import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAppSelector } from "./Store"
import Menu from "~/Screens/Menu"
import Settings from "~/Screens/Settings"
import Footer from "./Components/Footer"

type RootStackParamList = {
  Menu: undefined
  Settings: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default () => {
  const { backgroundColor } = useAppSelector(state => state.settings.theme)
  const navRef = useNavigationContainerRef()

  return (
    <>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          screenOptions={{
            animation: "slide_from_left",
            contentStyle: { backgroundColor },
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}>
          <Stack.Screen name="Menu" component={Menu} options={{ title: "" }} />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: "Settings" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer navRef={navRef} />
    </>
  )
}

// TODO: add all screens
