import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";

import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);
  const id = route.params?.expenseId;
  const isEditing = !!id;
  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === id
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const deleteExpenseHandler = async () => {
    setSubmitting(true);
    try {
      expensesContext.deleteExpense(id);
      await deleteExpense(id);
    } catch (err) {
      setError("Could not delete expense. Please try again.");
      setSubmitting(false);
    }
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    setSubmitting(true);
    try {
      if (isEditing) {
        expensesContext.updateExpense(id, expenseData);
        await updateExpense(id, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id });
      }
    } catch (err) {
      setError("Could not save data. Please try again.");
      setSubmitting(false);
    }
    navigation.goBack();
  };
  const errorHandler = () => setError(null);
  if (error && !submitting)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  if (submitting) return <LoadingOverlay />;
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
