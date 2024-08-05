import React, { useContext, useState } from "react";
import { z } from "zod";
import { ExpenseFormSchema } from "../utils/expense-form-schema";
import { useForm, UseFormReturn } from "react-hook-form";
import { createContext, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type EditExpenseFormValues = z.infer<typeof ExpenseFormSchema>;

interface EditExpenseFormContextProps {
  addExpenseForm: UseFormReturn<EditExpenseFormValues>;
  isEditingExpense: boolean;
  setIsEditingExpense: (value: boolean) => void;
  currentExpenseId: number | undefined;
  setCurrentExpenseId: (id: number | undefined) => void;
}

const EditExpenseFormContext = createContext<
  EditExpenseFormContextProps | undefined
>(undefined);

interface EditExpenseFormProviderProps {
  children: ReactNode;
}

const EditExpenseFormProvider = ({
  children,
}: EditExpenseFormProviderProps) => {
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState<
    number | undefined
  >();
  const addExpenseForm = useForm<EditExpenseFormValues>({
    resolver: zodResolver(ExpenseFormSchema),
    mode: "onChange",
  });

  const value: EditExpenseFormContextProps = {
    addExpenseForm,
    isEditingExpense,
    setIsEditingExpense,
    currentExpenseId,
    setCurrentExpenseId,
  };

  return (
    <EditExpenseFormContext.Provider value={value}>
      {children}
    </EditExpenseFormContext.Provider>
  );
};

const useEditExpenseFormProvider = (): EditExpenseFormContextProps => {
  const context = useContext(EditExpenseFormContext);

  if (!context) {
    throw new Error(
      "useEditExpenseFormProvider must be used within an EditExpenseFormProvider"
    );
  }

  return context;
};

export { EditExpenseFormProvider, useEditExpenseFormProvider };
