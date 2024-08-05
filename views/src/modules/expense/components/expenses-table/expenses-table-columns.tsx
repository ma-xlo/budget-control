import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../services/types";
import ColumnSorting from "../../../core/components/ui/data-table/column/column-sorting";
import { moneyMask } from "../../utils/helpers";
import Text from "../../../core/components/ui/text";
import React from "react";
import { Checkbox } from "../../../core/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ExpenseOptionsDropdownMenu from "../expense-options-dropdown-menu";
import ProtectedComponent from "../../../core/components/ui/protected-component";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../user/services/types";
import { getMeOptions } from "../../../user/services";
import { keyGetMe } from "../../../user/services/keys";
import { status } from "../../utils/expense-status";
import { StatusBadge, StatusBadgeVariant } from "../status-badge";
import { Badge } from "../../../core/components/ui/badge";

export const ExpensesTableColumns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todas"
        />
      </div>
    ),
    cell: ({ row }) => {
      const { userId } = row.original;
      const { data: me, status: statusMe } = useQuery<User>({
        queryKey: keyGetMe(),
        staleTime: Infinity,
      });

      if (statusMe === "error") {
        return <div className="flex w-full justify-center" />;
      }

      if (statusMe === "pending") {
        return <div className="flex w-full justify-center" />;
      }

      return (
        <ProtectedComponent allowed={me.id === userId}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar despesa"
          />
        </ProtectedComponent>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Status</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { status: originalStatus } = row.original;

      const currStatus = status.find(
        (status) => status.name === originalStatus
      );

      if (!currStatus) {
        return null;
      }

      return (
        <StatusBadge
          status={currStatus}
          variant={currStatus.color as StatusBadgeVariant}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Nome</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { name } = row.original;

      return <Text className="font-medium">{name}</Text>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Valor</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { value } = row.original;

      return <Text>{moneyMask(value.toString())}</Text>;
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Categoria</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { userName } = row.original;

      return (
        <Badge variant="outline">
          <Text>{userName}</Text>
        </Badge>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Categoria</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { categoryName } = row.original;

      return (
        <Badge variant="outline">
          <Text>{categoryName}</Text>
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Data de vencimento</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { dueDate } = row.original;

      if (!dueDate) {
        return null;
      }

      return <span>{format(dueDate, "PPP", { locale: ptBR })}</span>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Data de pagamento</ColumnSorting>;
    },

    cell: ({ row }) => {
      const { paymentDate } = row.original;

      if (!paymentDate) {
        return null;
      }

      return <span>{format(paymentDate, "PPP", { locale: ptBR })}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { userId } = row.original;
      const { data: me, status: statusMe } = useQuery<User>({
        queryKey: keyGetMe(),
        staleTime: Infinity,
      });

      if (statusMe === "error") {
        return <div className="flex w-full justify-center" />;
      }

      if (statusMe === "pending") {
        return <div className="flex w-full justify-center" />;
      }

      return (
        <div className="flex w-full justify-center">
          <ProtectedComponent allowed={me.id === userId}>
            <ExpenseOptionsDropdownMenu />
          </ProtectedComponent>
        </div>
      );
    },
  },
];
