import React, { useContext, useState } from "react";
import { z } from "zod";
import { ExpenseFormSchema } from "../utils/expense-form-schema";
import { useForm, UseFormReturn } from "react-hook-form";
import { createContext, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type AddExpenseFormValues = z.infer<typeof ExpenseFormSchema>;

interface AddExpenseFormContextProps {
  addExpenseForm: UseFormReturn<AddExpenseFormValues>;
  isAddingExpense: boolean;
  setIsAddingExpense: (value: boolean) => void;
}

const AddExpenseFormContext = createContext<
  AddExpenseFormContextProps | undefined
>(undefined);

interface AddExpenseFormProviderProps {
  children: ReactNode;
}

const AddExpenseFormProvider = ({ children }: AddExpenseFormProviderProps) => {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const addExpenseForm = useForm<AddExpenseFormValues>({
    resolver: zodResolver(ExpenseFormSchema),
    mode: "onChange",
  });

  const value: AddExpenseFormContextProps = {
    addExpenseForm,
    isAddingExpense,
    setIsAddingExpense,
  };

  return (
    <AddExpenseFormContext.Provider value={value}>
      {children}
    </AddExpenseFormContext.Provider>
  );
};

const useAddExpenseFormProvider = (): AddExpenseFormContextProps => {
  const context = useContext(AddExpenseFormContext);

  if (!context) {
    throw new Error(
      "useAddExpenseFormProvider must be used within an AddExpenseFormProvider"
    );
  }

  return context;
};

export { AddExpenseFormProvider, useAddExpenseFormProvider };
