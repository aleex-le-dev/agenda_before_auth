import {
  Pressable,
  StyleSheet,
  Modal,
  View,
  Text,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import Input from "./Input";
import DateTimePicker from "./DateTimePicker";
import { useEffect, useState } from "react";
import IsOnline from "./IsOnline";
import CustomBtn from "./CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "./ErrorModal";
import {
  addEvent,
  removeEvent,
  updateEvent,
} from "../../store/slices/agendaSlice";
import { createEvent, deleteAnEvent, updateAnEvent } from "../../lib";
import LoadingOverlay from "../overlay/LoadingOverlay";
import ErrorOverlay from "../overlay/ErrorOverlay";

const Form = ({ isVisible, closeModal, selectedEvent, httpError }) => {
  const closeKeyboard = () => Keyboard.dismiss();
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState([]);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const event = useSelector((state) =>
    state.agenda.events.find((evt) => evt.id === selectedEvent)
  );

  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const validateBeforeSubmit = () => {
    let messages = []; // tableau pour récupérer les messages d'erreur

    if (!formData.title.value.trim().length) {
      formErrorsHandler("title");
      messages.push("Le titre est obligatoire");
    }

    if (formData.isOnline.value && !isUrlValid(formData.location.value)) {
      formErrorsHandler("location");
      messages.push("L'URL est invalide");
    }

    if (
      (formData.phoneNumber.value.length &&
        formData.phoneNumber.value.length !== 10) ||
      isNaN(+formData.phoneNumber.value)
    ) {
      formErrorsHandler("phoneNumber");
      messages.push("Le numéro de téléphone est invalide");
    }

    if (formData.endDate.value <= formData.startDate.value) {
      formErrorsHandler("endDate");
      messages.push("Erreur sur la date de la fin d'événement");
    }
    if (messages.length) {
      console.log(messages);
      setErrorMessages(messages);
      setIsErrorModalVisible(true);
    } else {
      onSubmitForm();
    }
  };

  useEffect(() => {
    let initialState = {};
    if (event) {
      Object.keys(event).map((key) => {
        initialState[key] = {
          value: event[key],
          error: false,
        };
      });
      setFormData(initialState);
    }
  }, [event]);

  const initialState = {
    title: {
      value: "",
      error: false,
    },
    description: {
      value: "",
      error: false,
    },
    location: {
      value: "",
      error: false,
    },
    phoneNumber: {
      value: "",
      error: false,
    },
    startDate: {
      value: new Date(),
      error: false,
    },
    endDate: {
      value: new Date(),
      error: false,
    },
    isOnline: {
      value: false,
    },
  };
  const [formData, setFormData] = useState(initialState);

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

  function isUrlValid(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }

  const onSubmitForm = async () => {
    const data = {
      title: formData.title.value,
      location: formData.location.value,
      phoneNumber: formData.phoneNumber.value,
      description: formData.description.value,
      startDate: new Date(formData.startDate.value).toUTCString(), // On ne peut pas mettre d'objet Date dans le Store Redux
      endDate: new Date(formData.endDate.value).toUTCString(),
      isOnline: formData.isOnline.value,
    };
    if (event?.id) {
      data.id = event.id;
      await updateAnEvent({ id: data.id, ...data });
      dispatch(updateEvent(data));
    } else {
      setIsLoading(true);
      const newEventId = await createEvent(data);
      data.id = newEventId;
      dispatch(addEvent(data));
    }
    setTimeout(() => {
      setFormData(initialState);
      closeModal();
      setIsLoading(false);
    }, 2000);
  };

  const removeEvt = async () => {
    if (event) {
      await deleteAnEvent({ id: event.id }, token);
      dispatch(removeEvent({ id: event.id }));
    }
    closeModal();
  };

  const onCloseModal = () => {
    closeModal();
    setFormData(initialState);
  };

  return (
    <Modal
      visible={isVisible}
      presentationStyle="formSheet" // IOS demi écran
      animationType="slide"
    >
      <Pressable style={styles.formContainer} onPress={closeKeyboard}>
        <View style={styles.headerContainer}>
          <Text style={styles.formTitle}>Nouvel événement</Text>
          <Feather
            name="trash-2"
            size={28}
            color={colors.LIGHT}
            onPress={removeEvt}
            suppressHighlighting={true} // IOS désactive la surbrillance
          />
        </View>
        <Input
          label="Titre"
          autoCorrect={false}
          maxLength={40}
          onChangeText={(text) => onFormChange("title", text)}
          value={formData.title.value}
          error={formData.title.error}
        />
        <Input
          label={formData.isOnline.value ? "Url" : "Lieu"}
          inputMode={formData.isOnline.value ? "url" : "text"}
          autoCorrect={false}
          maxLength={40}
          onChangeText={(text) => onFormChange("location", text)}
          value={formData.location.value}
          error={formData.location.error}
        />
        <Input
          label="Téléphone"
          inputMode="tel"
          maxLength={10}
          onChangeText={(text) => onFormChange("phoneNumber", text)}
          value={formData.phoneNumber.value}
          error={formData.phoneNumber.error}
        />
        <Input
          label="Description"
          multiline
          maxLength={120}
          onChangeText={(text) => onFormChange("description", text)}
          value={formData.description.value}
        />
        <DateTimePicker
          label="Début"
          dateTime={formData.startDate.value}
          setDateTime={onFormChange.bind(this, "startDate")}
        />
        <DateTimePicker
          label="Fin"
          dateTime={formData.endDate.value}
          setDateTime={onFormChange.bind(this, "endDate")}
          error={formData.endDate.error}
        />
        <IsOnline
          isEnabled={formData.isOnline.value}
          setIsEnabled={onFormChange.bind(this, "isOnline")}
        />
        <View style={styles.btnContainer}>
          <CustomBtn
            text="Annuler"
            color={colors.PINK}
            onPress={onCloseModal}
          />
          <CustomBtn
            text="Valider"
            color={colors.VIOLET}
            onPress={validateBeforeSubmit}
            isLoading={isLoading}
          />
        </View>
      </Pressable>
      <ErrorModal
        isModalVisible={isErrorModalVisible}
        closeModal={closeErrorModal}
        errors={errorMessages}
      />
      {isLoading ? <LoadingOverlay /> : null}
    </Modal>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.DARK,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
