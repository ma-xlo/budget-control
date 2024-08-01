import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../services/types";
import ColumnSorting from "../../../core/components/ui/data-table/column/column-sorting";
import { moneyMask } from "../../utils/helpers";
import Text from "../../../core/components/ui/text";
import React from "react";

export const ExpensesTableColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnSorting column={column}>Nome</ColumnSorting>;
    },
    cell: ({ row }) => {
      const { name } = row.original;

      return <Text>{name}</Text>;
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
];
