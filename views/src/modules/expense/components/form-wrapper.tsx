import { forwardRef, HTMLAttributes } from "react";
import { AddExpenseFormSchema } from "../utils/add-expense-form-schema";
import { useAddExpenseFormProvider } from "./add-expense-form-provider";
import { Form } from "../../core/components/ui/form";
import { z } from "zod";
import React from "react";
import { useAddExpense } from "../services";
import { AddExpensePayload } from "../services/types";

interface FormWrapperProps extends HTMLAttributes<HTMLFormElement> {}

const FormWrapper = forwardRef<HTMLFormElement, FormWrapperProps>(
  ({ children, ...props }, ref) => {
    const { isAddingExpense, addExpenseForm } = useAddExpenseFormProvider();
    const { mutate: addExpense } = useAddExpense();

    type FormSchemaType = z.infer<typeof AddExpenseFormSchema>;

    const onSubmit = (values: FormSchemaType) => {
      const { name, value, } = values;

      const addExpensePayload: AddExpensePayload = {};

      addExpense({
        ...addExpensePayload,
      });
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
