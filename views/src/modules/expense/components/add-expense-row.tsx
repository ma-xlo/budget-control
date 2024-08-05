import React, { useRef } from "react";
import { Checkbox } from "../../core/components/ui/checkbox";
import {
  DataTableCell,
  DataTableRow,
} from "../../core/components/ui/data-table";
import { useAddExpenseFormProvider } from "../context/add-expense-form-provider";
import { Button } from "../../core/components/ui/button";
import { Check, X } from "lucide-react";
import { moneyMask } from "../utils/helpers";
import { Badge } from "../../core/components/ui/badge";
import CategorySelectField from "../../category/components/category-select-field";
import { cn } from "../../core/lib/utils";
import ExpenseFormInput from "./expense-form-input";
import PaymentDateSelector from "./payment-date-selector";
import DueDateSelector from "./due-date-selector";
import StatusSelectField from "./status-select-field";
import { User } from "../../user/services/types";
import { useQuery } from "@tanstack/react-query";
import { keyGetMe } from "../../user/services/keys";
import Text from "../../core/components/ui/text";

const AddExpenseRow = () => {
  const { setIsAddingExpense, addExpenseForm } = useAddExpenseFormProvider();
  const valueInput = useRef<HTMLInputElement>(null);

  const { data: me, status: statusMe } = useQuery<User>({
    queryKey: keyGetMe(),
    staleTime: Infinity,
  });

  return (
    <DataTableRow className="p-4">
      <DataTableCell className="p-4">
        <Checkbox disabled />
      </DataTableCell>
      <DataTableCell>
        <StatusSelectField
          form={addExpenseForm}
          className={cn(
            "border-none w-full justify-between",
            !addExpenseForm.getValues("category") && "text-muted-foreground",
            addExpenseForm.getValues("category") && "p-0 h-fit w-fit"
          )}
          badge={true}
          chevrons={false}
          isMessageAbsolute
        />
      </DataTableCell>
      <DataTableCell className="p-4">
        <ExpenseFormInput
          name="name"
          type="text"
          form={addExpenseForm}
          className="w-full border-none shadow-none"
          isMessageAbsolute
          autoFocus
        />
      </DataTableCell>
      <DataTableCell>
        <ExpenseFormInput
          ref={valueInput}
          form={addExpenseForm}
          maxLength={17}
          className="w-full border-none shadow-none"
          name="value"
          type="text"
          isMessageAbsolute
          placeholder="R$ 00,00"
          onChangeFunction={() => {
            if (valueInput.current) {
              const input: HTMLInputElement = valueInput.current;
              input.value = moneyMask(input.value);

              return input.value;
            }
          }}
        />
      </DataTableCell>
      <DataTableCell className="p-4">
        <Badge className="">
          <Text>{`${me?.firstName} ${me?.lastName}`}</Text>
        </Badge>
      </DataTableCell>

      <DataTableCell>
        <CategorySelectField
          form={addExpenseForm}
          className={cn(
            "border-none w-full justify-between",
            !addExpenseForm.getValues("category") && "text-muted-foreground",
            addExpenseForm.getValues("category") && "p-0 h-fit w-fit"
          )}
          badge={true}
          chevrons={false}
          isMessageAbsolute
        />
      </DataTableCell>
      <DataTableCell className="p-4">
        <DueDateSelector form={addExpenseForm} isMessageAbsolute />
      </DataTableCell>
      <DataTableCell className="p-4">
        <PaymentDateSelector form={addExpenseForm} isMessageAbsolute />
      </DataTableCell>
      <DataTableCell className="p-4">
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

export default AddExpenseRow;
