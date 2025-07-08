import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
import AgendaList from "../components/agenda/AgendaList";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { login } from "../lib";
import { setIsSignedIn, setToken } from "../store/slices/authSlice";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();
  
  const autoLogin = async () => {
    const storedCredentials = await SecureStore.getItemAsync("credentials");
    if (!storedCredentials) {
      return;
    }
try { 
  const credentials = JSON.parse(storedCredentials);
  const response = await login({
    email: credentials.email,
    password: credentials.password,
  });
  dispatch(setToken(response.idToken));
  dispatch(setIsSignedIn(true));
    } catch (error) {
      console.log("Auto-login error", error?.response?.data?.error?.message);
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

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
