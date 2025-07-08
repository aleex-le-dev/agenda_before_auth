import AuthForm from "./AuthForm";
import { useState } from "react";
import { register } from "../../lib";
import { useDispatch } from "react-redux";
import { setIsSignedIn, setToken } from "../../store/slices/authSlice";
import * as SecureStore from "expo-secure-store";

export default function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigateToSignin = () => {
    navigation.replace("Signin");
  };
 
  const submitFormHandler = async (values) => {
    setIsLoading(true);
    try {
      const user = await register({
        email: values.email,
        password: values.password,
      });
      console.log(user);
      dispatch(setIsSignedIn(true));
      dispatch(setToken(user.idToken));
      await SecureStore.setItemAsync("credentials", JSON.stringify(values));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      navigate={navigateToSignin}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading}
    />
  );
}
