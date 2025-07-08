import AuthForm from "./AuthForm";
import { useState } from "react";
import { login } from "../../lib";
import { useDispatch } from "react-redux";
import { setIsSignedIn, setToken } from "../../store/slices/authSlice";

export default function Signin({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigateToSignup = () => {
    navigation.replace("Signup");
  };
  const submitFormHandler = async (values) => {
    setIsLoading(true);
    try {
      const user = await login({
        email: values.email,
        password: values.password,
      });
      console.log(user);
      dispatch(setIsSignedIn(true));
      dispatch(setToken(user.idToken));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      loginScreen={true}
      navigate={navigateToSignup}
      submitFormHandler={submitFormHandler}
      isLoading={isLoading}
    />
  );
}
