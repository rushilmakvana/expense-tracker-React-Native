import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={"white"} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
