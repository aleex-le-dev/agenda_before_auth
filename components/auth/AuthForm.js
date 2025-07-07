import Input from "../modal/Input";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import CustomBtn from "../modal/CustomBtn";

export default function AuthForm({
  navigate,
  submitFormHandler,
  isLoading,
  loginScreen,
  errorMessages: propErrorMessages,
}) {
  const [formData, setFormData] = useState({
    email: { value: "", error: false },
    password: { value: "", error: false },
    confirmPassword: { value: "", error: false },
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const onFormChange = (key, value) => {
    setFormData((previousState) => {
      return {
        ...previousState,
        [key]: {
          value,
          error: false,
        },
      };
    });
  };

  const formErrorsHandler = (key) => {
    setFormData((previousState) => {
      return {
        ...previousState,
        [key]: {
          ...previousState[key],
          error: true,
        },
      };
    });
  };

  const onSubmitForm = () => {
    const data = {
      email: formData.email.value,
      password: formData.password.value,
    };
    submitFormHandler(data);
  };

  const validateBeforeSubmit = () => {
    let messages = [];

    if (!formData.email.value.trim().length) {
      formErrorsHandler("email");
      messages.push("L'email est obligatoire");
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.value.trim())
    ) {
      formErrorsHandler("email");
      messages.push("L'email est incorrect");
    }

    if (!formData.password.value.trim().length) {
      formErrorsHandler("password");
      messages.push("Le mot de passe est obligatoire");
    } else if (formData.password.value.length < 8) {
      formErrorsHandler("password");
      messages.push("Le mot de passe doit contenir au moins 8 caractères");
    }

    if (!loginScreen) {
      if (
        formData.confirmPassword.value.trim() !== formData.password.value.trim()
      ) {
        formErrorsHandler("confirmPassword");
        messages.push("Les mots de passe ne correspondent pas");
      }
    }

    if (messages.length) {
      setErrorMessages(messages);
    } else {
      onSubmitForm();
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>
        {loginScreen ? "Connexion" : "Inscription"}
      </Text>
      <Input
        label='Email'
        maxLength={60}
        autoCapitalize='none'
        onChangeText={(text) => onFormChange("email", text)}
        value={formData.email.value}
        error={formData.email.error}
      />
      <Input
        label='Mot de passe'
        maxLength={60}
        secureTextEntry={true}
        onChangeText={(text) => onFormChange("password", text)}
        value={formData.password.value}
        error={formData.password.error}
      />
      {!loginScreen && (
        <Input
          label='Confirmation du mot de passe'
          maxLength={60}
          secureTextEntry={true}
          value={formData.confirmPassword.value}
          onChangeText={(text) => onFormChange("confirmPassword", text)}
          error={formData.confirmPassword.error}
        />
      )}
      <View style={styles.btnContainer}>
        <CustomBtn
          text='Valider'
          onPress={() => validateBeforeSubmit()}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.DARK,
    justifyContent: "space-evenly",
  },
  title: {
    color: colors.LIGHT,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
  },
  btnContainer: {
    alignItems: "center",
  },
  switchAuthContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  switchAuthText: {
    color: colors.LIGHT,
    textAlign: "center",
  },
  textBold: {
    fontWeight: "700",
  },
});
