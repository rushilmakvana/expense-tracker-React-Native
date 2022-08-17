import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";

const Input = ({ label, InputConfig, style, invalid }) => {
  const inputstyle = [styles.input];

  if (InputConfig && InputConfig.multiLine) {
    inputstyle.push(styles.multiline);
  }
  if (invalid) {
    inputstyle.push(styles.errorInput);
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.errorlabel]}>{label}</Text>
      <TextInput style={inputstyle} {...InputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 5,
  },
  errorlabel: {
    color: GlobalStyles.colors.error50,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    padding: 10,
    color: GlobalStyles.colors.primary800,
    fontSize: 16,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
