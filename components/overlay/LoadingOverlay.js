import { View, StyleSheet } from "react-native";

export default function LoadingOverlay() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
