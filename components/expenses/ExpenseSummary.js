import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const ExpenseSummary = ({ expenses, periodName }) => {
  const totalsum = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${totalsum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
  },
  period: {
    color: GlobalStyles.colors.primary500,
    fontSize: 12,
  },
  sum: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
    fontSize: 16,
  },
});
