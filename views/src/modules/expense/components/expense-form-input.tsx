import React, { forwardRef } from "react";
import { Input, InputProps } from "../../core/components/ui/input";
import { ExpenseFormValues } from "../utils/expense-form-schema";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../core/components/ui/form";
import Text from "../../core/components/ui/text";
import { cn } from "../../core/lib/utils";

interface FormInputProps extends Omit<InputProps, "form"> {
  name: "name" | "value" | "category";
  label?: string;
  onChangeFunction?: () => number | string | undefined;
  form: UseFormReturn<ExpenseFormValues>;
  isMessageAbsolute?: boolean;
}

const ExpenseFormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      isMessageAbsolute = false,
      className,
      form,
      onChangeFunction,
      name,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="relative">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...props}
                {...field}
                ref={ref}
                className={cn("", className)}
                onChange={(event) => {
                  field.onChange(
                    onChangeFunction && onChangeFunction !== undefined
                      ? onChangeFunction()
                      : event
                  );
                }}
              />
            </FormControl>
            {form.getFieldState(name).error && isMessageAbsolute ? (
              <div className="px-2 py-1 bg-background border rounded-full absolute transition-all left-0 right-0 mx-auto w-fit max-w-fit">
                <Text>
                  <FormMessage className="text-xs opacity-75" />
                </Text>
              </div>
            ) : (
              <FormMessage className="text-xs" />
            )}
          </FormItem>
        )}
      />
    );
  }
);

export default ExpenseFormInput;
