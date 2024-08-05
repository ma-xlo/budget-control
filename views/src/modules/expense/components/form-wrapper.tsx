import { forwardRef, HTMLAttributes } from "react";
import { ExpenseFormSchema } from "../utils/expense-form-schema";
import { useAddExpenseFormProvider } from "../context/add-expense-form-provider";
import { Form } from "../../core/components/ui/form";
import { z } from "zod";
import React from "react";
import { useAddExpense } from "../services";
import { AddExpensePayload } from "../services/types";
import { toast } from "sonner";
import { queryClient } from "../../core/lib/react-query";
import {
  keyGetCategoriesExpensesTotal,
  keyGetMonthsExpensesTotal,
  keyGetUsersExpensesTotal,
  keyListExpenses,
} from "../services/keys";

interface FormWrapperProps extends HTMLAttributes<HTMLFormElement> {}

const FormWrapper = forwardRef<HTMLFormElement, FormWrapperProps>(
  ({ children, ...props }, ref) => {
    const { isAddingExpense, addExpenseForm, setIsAddingExpense } =
      useAddExpenseFormProvider();
    const { mutate: addExpense } = useAddExpense();

    type FormSchemaType = z.infer<typeof ExpenseFormSchema>;

    const onSubmit = (values: FormSchemaType) => {
      const addExpensePayload: AddExpensePayload = { ...values };

      addExpense(
        {
          ...addExpensePayload,
        },
        {
          onSuccess: () => {
            setIsAddingExpense(false);
            queryClient.invalidateQueries({
              queryKey: keyListExpenses(),
            });
            queryClient.invalidateQueries({
              queryKey: keyGetCategoriesExpensesTotal(),
            });
            queryClient.invalidateQueries({
              queryKey: keyGetUsersExpensesTotal(),
            });

            queryClient.invalidateQueries({
              queryKey: keyGetMonthsExpensesTotal(),
            });
            toast.success("Despesa adicionada com sucesso");
          },
        }
      );
    };

    if (isAddingExpense) {
      return (
        <Form {...addExpenseForm}>
          <form
            ref={ref}
            onSubmit={addExpenseForm.handleSubmit(onSubmit)}
            {...props}
          >
            {children}
          </form>
        </Form>
      );
    }

    return <>{children}</>;
  }
);

export default FormWrapper;
