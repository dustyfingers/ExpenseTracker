import { FlatList } from "react-native";

import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={(data) => <ExpenseItem {...data.item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
