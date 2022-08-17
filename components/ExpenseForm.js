import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { GlobalStyles } from "../constants/styles";

const ExpenseForm = ({ oncancel, onsubmit, buttonlabel, filled }) => {
  //   console.log(filled);
  const [inputvalues, setInputvalues] = useState({
    amount: { value: filled.amount, isvalid: true },
    description: { value: filled.description, isvalid: true },
    date: { value: filled.date, isvalid: true },
  });
  function inputhandler(key, enteredvalue) {
    setInputvalues((cur) => {
      return {
        ...cur,
        [key]: { value: enteredvalue, isvalid: true },
      };
    });
  }
  function confirmhandler() {
    const newData = {
      amount: +inputvalues.amount.value,
      date: inputvalues.date.value,
      description: inputvalues.description.value,
    };
    console.log("new data - ", newData.date);
    const isamount = !isNaN(newData.amount) && newData.amount > 0;
    const isdate =
      newData.date.length > 9 &&
      new Date(newData.date).toString() !== "Invalid Date";
    const isdescription = newData.description.trim().length > 0;
    // console.log(newData);
    if (!isamount || !isdate || !isdescription) {
      setInputvalues({
        amount: { value: inputvalues.amount.value, isvalid: isamount },
        date: { value: inputvalues.date.value, isvalid: isdate },
        description: {
          value: inputvalues.description.value,
          isvalid: isdescription,
        },
      });
      return;
    }
    onsubmit(newData);
  }

  const invalidinput =
    !inputvalues.amount.isvalid ||
    !inputvalues.description.isvalid ||
    !inputvalues.date.isvalid;
  return (
    <View>
      <View style={styles.inputrow}>
        <Input
          style={styles.row}
          label={"Amount"}
          invalid={!inputvalues.amount.isvalid}
          InputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputhandler.bind(this, "amount"),
            value: inputvalues.amount.value,
          }}
        />
        <Input
          style={styles.row}
          invalid={!inputvalues.date.isvalid}
          label={"Date"}
          InputConfig={{
            //   keyboardType: "decimal-pad",
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            onChangeText: inputhandler.bind(this, "date"),
            value: inputvalues.date.value,
          }}
        />
      </View>
      <Input
        // style={styles.row}
        label={"Description"}
        invalid={!inputvalues.description.isvalid}
        InputConfig={{
          multiLine: true,
          //   keyboardType: "",
          onChangeText: inputhandler.bind(this, "description"),
          value: inputvalues.description.value,
        }}
      />
      {invalidinput && <Text style={styles.errortext}>Invalid Inputs</Text>}
      <View style={styles.btn}>
        <Button style={styles.button} mode={"flat"} onPress={oncancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmhandler}>
          {buttonlabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errortext: {
    color: GlobalStyles.colors.error50,
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
