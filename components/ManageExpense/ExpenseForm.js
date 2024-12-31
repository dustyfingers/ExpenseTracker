import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import Input from "./Input";

const ExpenseForm = () => {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });
  const inputChangedHandler = (inputId, value) =>
    setInputValues((currentState) => ({ ...currentState, [inputId]: value }));
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangedHandler("amount", value),
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler("date", value),
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangedHandler("description", value),
          value: inputValues.description,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    // marginTop: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
    fontSize: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});

export default ExpenseForm;
