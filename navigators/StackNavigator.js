import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
import AgendaList from "../components/agenda/AgendaList";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.DARK,
          },
        }}>
        {isSignedIn ? (
          <Stack.Screen component={AgendaList} name='Agenda' />
        ) : (
          <>
            <Stack.Screen component={Signup} name='Signup' />
            <Stack.Screen component={Signin} name='Signin' />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
