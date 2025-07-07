import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import Form from "../modal/Form";
import { getAllEvents } from "../../lib";
import { setEvent } from "../../store/slices/agendaSlice";

const Header = ({ openModal }) => (
  <View style={styles.headerContainer}>
    <Text></Text>
    <Text style={styles.title}>Agenda</Text>
    <Ionicons
      name="add-circle"
      size={32}
      color={colors.PINK}
      onPress={openModal}
    />
  </View>
);

export default function Agendalist() {
  const agendaData = useSelector((state) => state.agenda.events);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const closeModal = () => {
    setIsVisible(false);
    setSelectedEvent(undefined);
  };
  const openModal = () => {
    setIsVisible(true);
  };
  const [selectedEvent, setSelectedEvent] = useState();

  const selectEventHandler = (id) => {
    setSelectedEvent(id);
    setIsVisible(true);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const getEvents = async () => {
        const events = await getAllEvents();
        if (events === undefined) {
          setHttpError(true);
        } else {
          dispatch(setEvent(events));
        }
      };
      setTimeout(() => {
        getEvents();
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.WHITE} size={"large"} />
        </View>
      ) : (
        <FlatList
          data={agendaData}
          ItemSeparatorComponent={<View style={{ height: 24 }} />}
          ListHeaderComponent={<Header openModal={openModal} />}
          renderItem={({ item }) => (
            <ListItem item={item} selectEventHandler={selectEventHandler} />
          )}
        />
      )}

      <Form
        isVisible={isVisible}
        closeModal={closeModal}
        selectedEvent={selectedEvent}
        httpError={httpError}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 16,
    backgroundColor: colors.DARK,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
});
