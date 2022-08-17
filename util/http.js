import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = "https://expense-tracker-db-c72ff-default-rtdb.firebaseio.com";

export async function storeData(Expensedata) {
  // console.log(Expensedata);
  const data = [
    {
      ...Expensedata,
      id: new Date().toString() + Math.random().toString(),
    },
  ];
  // console.log(data);
  //  await AsyncStorage.setItem('expenses')
  // const res = await axios.post(URL + "/expense.json", Expensedata);
  // const id = res.data.name;

  // return id;
}

export async function getExpense() {
  const data = await AsyncStorage.getItem("expenses");
  // console.log(data);
  const newdata = JSON.parse(data);
  const expenses = [];
  // console.log("expenses - ", typeof newdata);
  // console.log(newdata);
  for (let key in newdata) {
    // console.log(key);
  }
  // console.log("expenses - ", expenses);
  // const expense = await axios.get(URL + "/expense.json");
  // //   console.log("expenses - ", expense.data);
  // for (const key in expense.data) {
  //   expenses.push({
  //     id: key,
  //     amount: expense.data[key].amount,
  //     date: new Date(expense.data[key].date),
  //     description: expense.data[key].description,
  //   });
  // }

  return expenses;
}

export function update(id, expensedata) {
  return axios.put(URL + `/expense/${id}.json`, expensedata);
}

export function deleteExpense(id) {
  return axios.delete(URL + `/expense/${id}.json`);
}
