import AuthForm from "./AuthForm";
import { useState } from "react";

export default function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigateToSignin = () => {
    navigation.replace("Signin");
  };
  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <AuthForm
      navigate={navigateToSignin}
      submitFormHandler={submitHandler}
      isLoading={isLoading}
    />
  );
}
