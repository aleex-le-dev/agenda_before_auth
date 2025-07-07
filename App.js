import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Agendalist from "./components/agenda/AgendaList";
import { colors } from "./constants/colors";
// import axios from "axios";

export default function App() {
  // axios
  //   .get(process.env.EXPO_PUBLIC_API_URL)
  //   .then((res) => console.log(res.status));

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <Agendalist />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK,
  },
});
