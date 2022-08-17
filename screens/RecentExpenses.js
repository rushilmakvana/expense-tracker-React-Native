import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ExpenseOutput from "../components/expenses/ExpenseOutput";
import { Context } from "../store/expense-context";
import { getRecentExpenses } from "../util/date";
import { getExpense } from "../util/http";
import Loader from "../util/Loader";
import Error from "../util/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RecentExpenses = () => {
  const [error, setError] = useState();
  const [isloading, setIsloading] = useState(true);
  const EXPENSES = useContext(Context);
  // console.log(EXPENSES.expenses);
  const recent = EXPENSES.expenses
    ? EXPENSES.expenses.filter((expense) => {
        const today = new Date();
        const recentexpensdate = getRecentExpenses(today, 7);
        return (
          new Date(expense.date) >= recentexpensdate &&
          new Date(expense.date) <= today
        );
      })
    : [];
  useLayoutEffect(() => {
    async function getdata() {
      setIsloading(true);
      try {
        const expenses = await AsyncStorage.getItem("expenses");
        EXPENSES.setExpense(JSON.parse(expenses));
      } catch (error) {
        setError("Could not fetch data - try again later");
      }
      // console.log(EXPENSES.expenses)
      setIsloading(false);
    }
    getdata();
  }, []);
  if (error && !isloading) {
    return <Error text={error} />;
  }

  if (isloading) {
    return <Loader />;
  }
  return (
    <ExpenseOutput
      expenses={recent}
      expensesPeriod="Last 7 days"
      falleback={"No expenses in last 7 days"}
    />
    // <View />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
