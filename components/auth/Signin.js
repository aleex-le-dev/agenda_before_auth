import { AuthForm } from "./AuthForm";
import { useState } from "react";

export default function Signin({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigateToSignup = () => {
    navigation.replace("Signup");
  };
  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <AuthForm loginScreen={true}
      navigate={navigateToSignup}
      submitFormHandler={submitHandler}
      isLoading={isLoading}
    />
  );
}
