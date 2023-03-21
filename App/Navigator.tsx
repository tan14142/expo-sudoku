import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Menu from "~/Screens/Main"
import Settings from "~/Screens/Settings"

const Stack = createNativeStackNavigator()

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#3f2f25" },
      }}>
      <Stack.Screen
        name="Main"
        component={Menu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  </NavigationContainer>
)
