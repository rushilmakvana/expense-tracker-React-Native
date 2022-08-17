import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpanseList from "./ExpanseList";
import { GlobalStyles } from "../../constants/styles";

const ExpenseOutput = ({ expenses, expensesPeriod, falleback }) => {
  let content = <Text style={styles.text}>{falleback}</Text>;

  if (expenses.length > 0) {
    content = <ExpanseList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseSummary periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  );
};

export default ExpenseOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    marginTop: 24,
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});
