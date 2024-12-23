import { FlatList, Text } from "react-native";

const ExpenseItem = ({ data }) => {
  return <Text>{data.item.description}</Text>;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={(data) => <ExpenseItem data={data} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
