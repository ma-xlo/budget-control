import {
  ComboboxContent,
  ComboboxRoot,
  ComboboxTrigger,
} from "../../core/components/ui/combobox";
import { cn } from "../../core/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../category/services/types";
import { useAddExpenseFormProvider } from "../../expense/context/add-expense-form-provider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../core/components/ui/form";
import React, { useState } from "react";
import { Button } from "../../core/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { keyListCategories } from "../services/keys";
import CategoriesSearchableList from "./categories-searchable-list";
import { Badge } from "../../core/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormValues } from "../../expense/utils/expense-form-schema";
import Text from "../../core/components/ui/text";

interface CategorySelectFieldProps {
  form: UseFormReturn<ExpenseFormValues>;
  className?: string;
  badge?: boolean;
  chevrons?: boolean;
  label?: string;
  isMessageAbsolute?: boolean;
  disabled?: boolean;
}

const CategorySelectField = ({
  isMessageAbsolute = false,
  badge = false,
  chevrons = true,
  label,
  className,
  form,
  disabled,
}: CategorySelectFieldProps) => {
  const [open, setOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: keyListCategories(),
    enabled: !!form.getValues("category"),
  });

  return (
    <FormField
      control={form.control}
      name="category"
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
                  {field.value && categories ? (
                    badge ? (
                      <Badge variant="outline">
                        {
                          categories.find(
                            (category) => category.id === field.value
                          )?.name
                        }
                      </Badge>
                    ) : (
                      categories.find((category) => category.id === field.value)
                        ?.name
                    )
                  ) : (
                    "Categoria"
                  )}
                  {((!field.value && chevrons === false) || chevrons) && (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </ComboboxTrigger>
            </FormControl>
            <ComboboxContent className="p-0">
              <CategoriesSearchableList
                onSelect={(value) => {
                  const category = categories?.find(
                    (category) => category.name === value
                  );

                  if (category) {
                    form.setValue("category", category.id);
                    setOpen(false);
                  }
                }}
              />
            </ComboboxContent>
          </ComboboxRoot>
          {form.getFieldState("category").error && isMessageAbsolute ? (
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

export default CategorySelectField;
