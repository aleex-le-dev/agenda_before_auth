import AuthForm from "./AuthForm";
import { useState } from "react";
import { register } from "../../lib";

export default function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigateToSignin = () => {
    navigation.replace("Signin");
  };
  const submitFormHandler = async (values) => {
    try {
      const user = await register(values.email, values.password);
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
