import { forwardRef } from "react";
import { Button, ButtonProps } from "../../core/components/ui/button";
import React from "react";
import { useAddExpense } from "../services";
import { useAddExpenseFormProvider } from "./add-expense-form-provider";

const AddExpenseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const { setIsAddingExpense } = useAddExpenseFormProvider();

    return (
      <Button ref={ref} {...props} onClick={() => setIsAddingExpense(true)} />
    );
  }
);

export default AddExpenseButton;
