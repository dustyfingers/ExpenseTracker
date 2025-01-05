import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);
  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  const getExpenses = async () => {
    setLoading(true);
    try {
      const expenses = await fetchExpenses();
      expensesContext.setExpenses(expenses);
    } catch (err) {
      setError("Could not fetch expenses!");
    }
    setLoading(false);
  };
  useEffect(() => {
    getExpenses();
  }, []);
  const errorHandler = () => {
    setError(false);
  };
  if (error && !loading)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  if (loading) return <LoadingOverlay />;
  return (
    <ExpensesOutput
      periodName={"Last 7 Days"}
      expenses={recentExpenses}
      fallbackText={"No expenses registered for the last 7 days."}
    />
  );
};

export default RecentExpenses;
