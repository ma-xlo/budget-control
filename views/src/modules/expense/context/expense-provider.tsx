import { createContext, ReactNode, useContext } from "react";
import React from "react";
import { Expense } from "../services/types";

interface ExpenseContextProps {
  expense: Expense;
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined
);

interface ExpenseProviderProps extends ExpenseContextProps {
  children: ReactNode;
}

const ExpenseProvider = ({ children, expense }: ExpenseProviderProps) => {
  const value = {
    expense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

const useExpenseContext = (): ExpenseContextProps => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "Expense compound components cannot be rendered outside the ExpenseProvider"
    );
  }

  return context as ExpenseContextProps;
};

export { ExpenseProvider, useExpenseContext };
