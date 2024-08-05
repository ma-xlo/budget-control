import { useQuery } from "@tanstack/react-query";
import { keyListExpenses } from "../modules/expense/services/keys";
import { API_URL } from "../modules/core/config/environment";
import ExpensesScreen from "../modules/expense/screens/expenses";
import React from "react";

const ExpensesPage = () => {
  return <ExpensesScreen />;
};

export default ExpensesPage;
