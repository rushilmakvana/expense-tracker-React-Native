import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpenseOutput from "../components/expenses/ExpenseOutput";
import { Context } from "../store/expense-context";
import { getExpense } from "../util/http";
import Loader from "../util/Loader";
import Error from "../util/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { arrangeDate } from "../util/date";
const AllExpenses = () => {
  const [error, setError] = useState();
  const [isloading, setIsloading] = useState(true);
  const EXPENSES = useContext(Context);
  // const data =.then().catch();
  useEffect(() => {
    async function getdata() {
      setIsloading(true);
      try {
        let expenses = await AsyncStorage.getItem("expenses");
        expenses = JSON.parse(expenses);
        // console.log("expenses - ", expenses);
        if (expenses) {
          EXPENSES.setExpense(expenses);
        } else {
          EXPENSES.setExpense([]);
        }
      } catch (error) {
        setError("Could not fetch data - try again later");
      }
      setIsloading(false);
    }
    getdata();
  }, []);

  if (!isloading && error) {
    return <Error text={error} />;
  }
  if (isloading) {
    return <Loader />;
  }
  return (
    <ExpenseOutput
      expenses={EXPENSES.expenses}
      expensesPeriod="Total"
      falleback={"No registered expenses yet."}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
