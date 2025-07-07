import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import CustomBtn from "./CustomBtn";

const ErrorModal = ({ isModalVisible, closeModal, errors }) => {
  return (
    <Modal visible={isModalVisible} animationType="slide" transparent>
      <View style={styles.container}>
        {errors?.map((error, i) => (
          <Text key={i} style={styles.text}>
            &#8226; {error}
          </Text>
        ))}
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
          }}
        >
          <CustomBtn color={colors.VIOLET} text={"OK"} onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: Dimensions.get("screen").height / 3,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 24,
  },
  text: {
    fontSize: 18,
    marginLeft: 8,
    marginTop: 8,
  },
});
