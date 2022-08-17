import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { arrangeDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
const ExpenseItem = ({ id, amount, description, date, scale, opacity }) => {
  const navigation = useNavigation();
  function handleItem() {
    navigation.navigate("Manage Expenses", {
      id: id,
    });
  }

  //   console.log(date);
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Pressable
        style={styles.container}
        android_ripple={{ color: "#ccc" }}
        onPress={handleItem}
      >
        <View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{arrangeDate(new Date(date))}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amounttext}>{amount.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary400,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 6,
    minWidth: 80,
  },
  amounttext: {
    textAlign: "center",
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  description: {
    color: "white",
    fontWeight: "bold",
  },
  date: {
    color: "white",
  },
});
