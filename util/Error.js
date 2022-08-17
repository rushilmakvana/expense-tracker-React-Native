import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";

const Error = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Error occured</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 8,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
