import {
  ComboboxContent,
  ComboboxRoot,
  ComboboxTrigger,
} from "../../core/components/ui/combobox";
import { cn } from "../../core/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../core/components/ui/form";
import React, { useEffect, useState } from "react";
import { Button } from "../../core/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import StatusSearchableList from "./status-searchable-list";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormValues } from "../utils/expense-form-schema";
import Text from "../../core/components/ui/text";
import { status } from "../utils/expense-status";
import {
  StatusBadgeVariant,
  StatusBadge,
  statusBadgeVariants,
} from "./status-badge";
import { ExpenseStatus } from "../services/types";

interface StatusSelectFieldProps {
  form: UseFormReturn<ExpenseFormValues>;
  className?: string;
  badge?: boolean;
  chevrons?: boolean;
  label?: string;
  isMessageAbsolute?: boolean;
  disabled?: boolean;
}

const StatusSelectField = ({
  isMessageAbsolute = false,
  badge = false,
  chevrons = true,
  label,
  className,
  form,
  disabled,
}: StatusSelectFieldProps) => {
  const [open, setOpen] = useState(false);

  const formStatus = status.find(
    (status) => status.name === form.getValues().status
  );

  const [selectedStatus, setSelectedStatus] = useState<
    ExpenseStatus | undefined
  >(formStatus);

  useEffect(() => {
    const { dueDate, paymentDate } = form.getValues();

    if (dueDate && !paymentDate) {
      if (dueDate < new Date()) {
        form.setValue("status", "Atrasada");
      } else {
        form.setValue("status", "Agendada");
      }
    }

    if (formStatus) {
      setSelectedStatus(formStatus);
    }
  }, [
    form.getValues("status"),
    form.getValues("dueDate"),
    form.getValues("paymentDate"),
  ]);

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem className="w-full relative">
          {label && <FormLabel>{label}</FormLabel>}
          <ComboboxRoot open={open} onOpenChange={setOpen} modal>
            <FormControl>
              <ComboboxTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    !field.value && "text-muted-foreground",
                    className
                  )}
                  role="combobox"
                  disabled={disabled}
                >
                  {field.value && status && selectedStatus ? (
                    badge ? (
                      <StatusBadge
                        status={selectedStatus}
                        variant={selectedStatus?.color as StatusBadgeVariant}
                      ></StatusBadge>
                    ) : (
                      status.find((status) => status.name === field.value)?.name
                    )
                  ) : (
                    "Status"
                  )}
                  {((!field.value && chevrons === false) || chevrons) && (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </ComboboxTrigger>
            </FormControl>
            <ComboboxContent className="p-0">
              <StatusSearchableList
                onSelect={(value) => {
                  const selectedStatus = status?.find(
                    (status) => status.name === value
                  );

                  if (selectedStatus) {
                    setSelectedStatus(selectedStatus);
                  }

                  if (selectedStatus) {
                    form.setValue("status", selectedStatus.name);
                    setOpen(false);
                  }
                }}
              />
            </ComboboxContent>
          </ComboboxRoot>
          {form.getFieldState("status").error && isMessageAbsolute ? (
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
};

export default StatusSelectField;
