import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
// import AgendaList from "../components/agenda/AgendaList";
import { colors } from "../constants/colors";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.DARK,
          },
        }}>
        {/* <Stack.Screen component={AgendaList} name='Agenda' /> */}
        <Stack.Screen component={Signup} name='Signup' />
        <Stack.Screen component={Signin} name='Signin' />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
