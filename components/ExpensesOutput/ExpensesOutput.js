import { View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ expenses, periodName }) => {
  return (
    <View>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList />
    </View>
  );
};

export default ExpensesOutput;
