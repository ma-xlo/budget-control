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
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../core/lib/utils";
import { Badge } from "../../core/components/ui/badge";
import { status } from "../utils/expense-status";
import { StatusBadge, StatusBadgeVariant } from "./status-badge";

interface FilterSearchableListProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {}

const StatusSearchableList = ({
  className,
  ...props
}: FilterSearchableListProps) => {
  return (
    <SearchableListRoot>
      <SearchableListInput placeholder="Selecionar status..." />
      <SearchableList>
        <SearchableListEmpty>Nenhum status encontrado.</SearchableListEmpty>
        <SearchableListGroup {...props}>
          {status?.map((status) => (
            <SearchableListItem
              className={(cn("gap-2 hover:cursor-pointer"), className)}
              key={status.id}
              value={status.id}
              {...props}
            >
              <StatusBadge
                status={status}
                variant={status.color as StatusBadgeVariant}
              ></StatusBadge>
            </SearchableListItem>
          ))}
        </SearchableListGroup>
      </SearchableList>
    </SearchableListRoot>
  );
};

export default StatusSearchableList;
