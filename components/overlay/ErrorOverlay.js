import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../constants/colors";

export default function ErrorOverlay() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Une erreur s'est produite. Veuillez réessayer ultérieurement
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.WHITE,
    textAlign: "center",
  },
});
