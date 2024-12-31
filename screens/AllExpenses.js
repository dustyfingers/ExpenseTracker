import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      periodName={"All Expenses"}
      expenses={expensesContext.expenses}
      fallbackText={"No registered expenses found!"}
    />
  );
};

export default AllExpenses;
