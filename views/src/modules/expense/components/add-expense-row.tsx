import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  HTMLAttributes,
  useRef,
} from "react";
import { Checkbox } from "../../core/components/ui/checkbox";
import {
  DataTableCell,
  DataTableRow,
} from "../../core/components/ui/data-table";
import { useAddExpenseFormProvider } from "./add-expense-form-provider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../core/components/ui/form";
import { Button } from "../../core/components/ui/button";
import { Check, X } from "lucide-react";
import { Input, InputProps } from "../../core/components/ui/input";
import Text from "../../core/components/ui/text";
import { moneyMask } from "../utils/helpers";
import { Badge } from "../../core/components/ui/badge";
import CategorySelectField from "../../category/components/category-select-field";

const AddExpenseRow = () => {
  const { setIsAddingExpense, addExpenseForm } = useAddExpenseFormProvider();
  const valueInput = useRef<HTMLInputElement>(null);

  return (
    <DataTableRow className="p-0">
      <DataTableCell>
        <Checkbox disabled />
      </DataTableCell>
      <DataTableCell className="p-0">
        <FormInput name="name" type="text" autoFocus />
      </DataTableCell>
      <DataTableCell>
        <FormInput
          ref={valueInput}
          maxLength={17}
          name="value"
          type="text"
          onChangeFunction={() => {
            if (valueInput.current) {
              console.log(valueInput.current);

              const input: HTMLInputElement = valueInput.current;
              input.value = moneyMask(input.value);

              return input.value;
            }
          }}
        />
      </DataTableCell>
      <DataTableCell>
        <Badge className="">Eu mesmo</Badge>
      </DataTableCell>
      <DataTableCell>Status</DataTableCell>
      <DataTableCell>
        <CategorySelectField />
      </DataTableCell>
      <DataTableCell>
        <FormInput name="dueDate" type="string" />
      </DataTableCell>
      <DataTableCell>
        <FormInput name="paymentDate" type="string" />
      </DataTableCell>
      <DataTableCell>
        <div className="flex items-center gap-1 w-full justify-center">
          <Button size="icon" type="submit">
            <Check className="w-4 h-4 shrink-0" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="bg-destructive/70"
            onClick={() => {
              setIsAddingExpense(false), addExpenseForm.reset();
            }}
          >
            <X className="w-4 h-4 shrink-0" />
          </Button>
        </div>
      </DataTableCell>
    </DataTableRow>
  );
};

interface FormInputProps extends InputProps {
  name: "name" | "value" | "category" | "dueDate" | "paymentDate";
  label?: string;
  onChangeFunction?: () => number | string | undefined;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ onChangeFunction, name, label, ...props }, ref) => {
    const { addExpenseForm } = useAddExpenseFormProvider();

    return (
      <FormField
        control={addExpenseForm.control}
        name={name}
        render={({ field }) => (
          <FormItem className="relative">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...props}
                {...field}
                ref={ref}
                className="w-full border-none shadow-none"
                onChange={(event) => {
                  field.onChange(
                    onChangeFunction && onChangeFunction !== undefined
                      ? onChangeFunction()
                      : event
                  );
                }}
              />
            </FormControl>
            {addExpenseForm.getFieldState(name).error && (
              <div className="px-2 py-1 bg-background border rounded-full absolute transition-all left-0 right-0 mx-auto w-fit max-w-fit">
                <Text>
                  <FormMessage className="text-xs opacity-75" />
                </Text>
              </div>
            )}
          </FormItem>
        )}
      />
    );
  }
);

export default AddExpenseRow;
