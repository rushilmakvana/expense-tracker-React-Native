import { StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import Iconbtn from "../icons/Headerbtn";
import { GlobalStyles } from "../constants/styles";
import { Context } from "../store/expense-context";
import ExpenseForm from "../components/ExpenseForm";
import { arrangeDate } from "../util/date";

import Loader from "../util/Loader";
import Error from "../util/Error";

const ManageExpenses = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isloading, setIsloading] = useState(false);
  let filled = {
    amount: "",
    date: "",
    description: "",
    id: "",
  };
  const Expenses = useContext(Context);
  const id = route.params?.id;
  const isedit = !!id;
  // console.log("id - ", id);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isedit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isedit]);

  if (id) {
    const dummyExpense = Expenses.expenses.find((expense) => expense.id === id);
    console.log("dummy -", dummyExpense);
    filled = {
      amount: dummyExpense ? dummyExpense.amount.toString() : "",
      date: dummyExpense ? arrangeDate(new Date(dummyExpense.date)) : "",
      description: dummyExpense ? dummyExpense.description : "",
      id: dummyExpense ? dummyExpense.id : "",
    };
    // setFilled(dummyExpense);
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function ButtonHandler(expensedata) {
    setIsloading(true);
    try {
      if (id) {
        // await update(id, expensedata);
        Expenses.updateExpense(id, expensedata);
        // console.log(expensedata.date);
      } else {
        // console.log("expense data - ", expensedata);
        // const id = await storeData(expensedata);
        Expenses.addExpense({ ...expensedata });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - try again later");
      setIsloading(false);
    }
  }
  async function DeleteHandler() {
    setIsloading(true);
    try {
      // await deleteExpense(id);
      Expenses.deleteExpense(id);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete data - try again later");
      setIsloading(false);
    }
  }

  if (!isloading && error) {
    return <Error text={error} />;
  }

  if (isloading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        buttonlabel={isedit ? "Update" : "Add"}
        oncancel={cancelHandler}
        onsubmit={ButtonHandler}
        filled={filled}
      />

      {isedit && (
        <View style={styles.deleteContainer}>
          <Iconbtn
            onPress={DeleteHandler}
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
          />
        </View>
      )}
      {/* <Text>ManageExpenses</Text> */}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
});
