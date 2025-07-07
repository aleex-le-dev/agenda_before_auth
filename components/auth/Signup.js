import AuthForm from "./AuthForm";
import { useState } from "react";
import { register } from "../../lib";
import { useDispatch } from "react-redux";
import { setIsSignedIn } from "../../store/slices/userSlice";

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
