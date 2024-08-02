import {
  SearchableList,
  SearchableListEmpty,
  SearchableListGroup,
  SearchableListInput,
  SearchableListItem,
  SearchableListRoot,
} from "@core/components/ui/searchable-list";
import { useQuery } from "@tanstack/react-query";
import React, { ComponentPropsWithoutRef } from "react";
import { Category } from "../services/types";
import { keyListCategories } from "../services/keys";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../core/lib/utils";

interface FilterSearchableListProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {}

const CategoriesSearchableList = ({
  className,
  ...props
}: FilterSearchableListProps) => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: keyListCategories(),
  });

  return (
    <SearchableListRoot>
      <SearchableListInput placeholder="Selecionar categoria..." />
      <SearchableList>
        <SearchableListEmpty>Nenhuma categoria encontrada.</SearchableListEmpty>
        <SearchableListGroup {...props}>
          {categories?.map((category) => (
            <SearchableListItem
              className={(cn("gap-2 hover:cursor-pointer"), className)}
              key={category.id}
              value={category.id}
              {...props}
            >
              {category.name}
            </SearchableListItem>
          ))}
        </SearchableListGroup>
      </SearchableList>
    </SearchableListRoot>
  );
};

export default CategoriesSearchableList;
