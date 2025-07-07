import { View, Text, Switch, StyleSheet, Platform } from "react-native";
import { colors } from "../../constants/colors";

export default function IsOnline({ isEnabled, setIsEnabled }) {
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>En ligne</Text>
      <Switch
        trackColor={{ false: colors.GREY, true: colors.LIGHT }}
        thumbColor={isEnabled ? colors.VIOLET : colors.WHITE}
        ios_backgroundColor={colors.GREY}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
  },
  label: {
    color: colors.LIGHT,
    fontWeight: "600",
    fontSize: 18,
  },
  switch: {
    transform: [{ scale: Platform.select({ android: 1.2, ios: 1 }) }],
  },
});
