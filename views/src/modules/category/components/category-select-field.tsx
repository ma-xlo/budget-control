import {
  ComboboxContent,
  ComboboxRoot,
  ComboboxTrigger,
} from "../../core/components/ui/combobox";
import { cn } from "../../core/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../category/services/types";
import { useAddExpenseFormProvider } from "../../expense/components/add-expense-form-provider";
import {
  FormControl,
  FormField,
  FormItem,
} from "../../core/components/ui/form";
import React, { useState } from "react";
import { Button } from "../../core/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { keyListCategories } from "../services/keys";
import CategoriesSearchableList from "./categories-searchable-list";
import { Badge } from "../../core/components/ui/badge";

const CategorySelectField = () => {
  const { addExpenseForm } = useAddExpenseFormProvider();
  const [open, setOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: keyListCategories(),
    enabled: !!addExpenseForm.getValues("category"),
  });

  return (
    <FormField
      control={addExpenseForm.control}
      name="category"
      render={({ field }) => (
        <FormItem className="w-full">
          <ComboboxRoot open={open} onOpenChange={setOpen}>
            <FormControl>
              <ComboboxTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "border-none w-full justify-between",
                    !field.value && "text-muted-foreground",
                    field.value && "p-0 h-fit w-fit"
                  )}
                  role="combobox"
                >
                  {field.value && categories ? (
                    <Badge>
                      {
                        categories.find(
                          (categories) => categories.id === field.value
                        )?.name
                      }
                    </Badge>
                  ) : (
                    "Categoria"
                  )}
                  {!field.value && (
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
                    addExpenseForm.setValue("category", category.id);
                    setOpen(false);
                  }
                }}
              />
            </ComboboxContent>
          </ComboboxRoot>
        </FormItem>
      )}
    />
  );
};

export default CategorySelectField;
