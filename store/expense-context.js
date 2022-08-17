import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";

const Context = createContext();

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // console.log("state - ", state);
      // console.log("new data - ", action.data);
      // newarr =
      //   //   const id = new Date().toString() + Math.random().toString();
      //   [action.data, ...state];
      // return newarr;
      // console.log("data - ", action.data);
      const id = new Date().toString() + Math.random().toString();
      // console.log("id - ", id);
      const narr = [
        {
          id: id,
          ...action.data,
        },
        ...state,
      ];
      // console.log("new arr- ", narr);
      AsyncStorage.setItem("expenses", JSON.stringify(narr)).then().catch();
      return narr;
    // console.log(narr);
    case "UPDATE":
      // console.log(action.data.expenses);
      const idx = state.findIndex((expense) => expense.id === action.data.id);
      const item = state[idx];
      // console.log(item);
      const updatedItem = { ...item, ...action.data.expenses };
      const updatedExpense = [...state];
      updatedExpense[idx] = updatedItem;
      const arr = updatedExpense;
      AsyncStorage.setItem("expenses", JSON.stringify(arr)).then().catch();
      return arr;
    case "DELETE":
      // console.log(action.data);
      let newarr = state.filter((expense) => expense.id !== action.data);
      AsyncStorage.setItem("expenses", JSON.stringify(newarr)).then().catch();
      return newarr;
    case "SET":
      // console.log("action - ", action.data);
      // var y = action.data.reverse();
      // console.log("reverse - ", y);
      // const reverted = action.data.reverse();
      // console.log(reverted);
      // AsyncStorage.setItem("expenses", JSON.stringify(reverted)).then().catch();
      return action.data;

    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, []);
  function DeleteHandler(id) {
    // console.log("clicked", "del");
    dispatch({ type: "DELETE", data: id });
  }
  function update(id, expenses) {
    dispatch({ type: "UPDATE", data: { id: id, expenses: expenses } });
  }
  function add(expenses) {
    dispatch({ type: "ADD", data: expenses });
  }
  function setExpense(expenses) {
    dispatch({ type: "SET", data: expenses });
  }
  const value = {
    expenses: state,
    setExpense: setExpense,
    deleteExpense: DeleteHandler,
    addExpense: add,
    updateExpense: update,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export { Context };
export default ExpenseContextProvider;
