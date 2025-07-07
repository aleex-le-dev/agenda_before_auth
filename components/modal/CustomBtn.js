import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/colors";

export default function CustomBtn({ text, onPress, color, isLoading = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.btn, { backgroundColor: color }]}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} color={colors.WHITE} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 140,
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.WHITE,
    fontSize: 24,
    fontWeight: "800",
  },
});
