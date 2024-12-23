import { StyleSheet, View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "a pair of shoes",
    amount: 39.99,
    date: new Date("2024-12-15"),
  },
  {
    id: "e2",
    description: "groceries - costco",
    amount: 239.64,
    date: new Date("2024-12-16"),
  },
  {
    id: "e3",
    description: "groceries - king soopers",
    amount: 104.33,
    date: new Date("2024-12-17"),
  },
  {
    id: "e4",
    description: "garden supplies",
    amount: 24.25,
    date: new Date("2024-12-19"),
  },
  {
    id: "e5",
    description: "books",
    amount: 21.19,
    date: new Date("2024-12-22"),
  },
];

const ExpensesOutput = ({ expenses, periodName }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});

export default ExpensesOutput;
