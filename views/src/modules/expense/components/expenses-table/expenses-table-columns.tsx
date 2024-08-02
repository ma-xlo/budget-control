import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../services/types";
import ColumnSorting from "../../../core/components/ui/data-table/column/column-sorting";
import { moneyMask } from "../../utils/helpers";
import Text from "../../../core/components/ui/text";
import React from "react";
import { Checkbox } from "../../../core/components/ui/checkbox";
import {
  ResponsiveDropdownContent,
  ResponsiveDropdownLabel,
  ResponsiveDropdownMenu,
  ResponsiveDropdownMenuHeader,
  ResponsiveDropdownMenuItem,
  ResponsiveDropdownMenuSeparator,
  ResponsiveDropdownTrigger,
} from "../../../core/components/ui/responsive-dropdown-menu";
import { Button } from "../../../core/components/ui/button";
import { MoreHorizontal } from "lucide-react";

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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar despesa"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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

      return <span>{moneyMask(value.toString())}</span>;
    },
  },
  {
    accessorKey: "responsible",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Responsável</ColumnSorting>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Status</ColumnSorting>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Categoria</ColumnSorting>;
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Data de vencimento</ColumnSorting>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Data de pagamento</ColumnSorting>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <ResponsiveDropdownMenu>
          <ResponsiveDropdownTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </ResponsiveDropdownTrigger>

          <ResponsiveDropdownContent align="end">
            <ResponsiveDropdownMenuHeader>
              <ResponsiveDropdownLabel>Ações</ResponsiveDropdownLabel>
            </ResponsiveDropdownMenuHeader>
            <ResponsiveDropdownMenuSeparator />
            <ResponsiveDropdownMenuItem>Editar</ResponsiveDropdownMenuItem>
          </ResponsiveDropdownContent>
        </ResponsiveDropdownMenu>
      );
    },
  },
];
