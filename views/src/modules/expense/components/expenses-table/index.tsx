import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { keyListExpenses } from "../../services/keys";
import { Expense } from "../../services/types";
import { ExpensesTableColumns } from "./expenses-table-columns";
import { useState } from "react";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableProvider,
  DataTableRow,
} from "../../../core/components/ui/data-table";
import { ColumnResizer } from "../../../core/components/ui/data-table/column/column-resizer";
import { DataTablePagination } from "../../../core/components/ui/data-table/data-table-pagination";
import React from "react";
import { Checkbox } from "../../../core/components/ui/checkbox";
import { useAddExpenseFormProvider } from "../add-expense-form-provider";
import { Plus } from "lucide-react";
import FormWrapper from "../form-wrapper";
import AddExpenseRow from "../add-expense-row";

const ExpensesTable = () => {
  const { isAddingExpense, setIsAddingExpense } = useAddExpenseFormProvider();
  const { data: expenses, status: statusListExpenses } = useQuery<Expense[]>({
    queryKey: keyListExpenses(),
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: expenses as Expense[],
    columns: ExpensesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (statusListExpenses === "error") {
    return <div>Erro ao carregar as despesas</div>;
  }

  if (statusListExpenses === "pending") {
    return <div>Carregando...</div>;
  }

  return (
    <FormWrapper>
      <div className="border rounded-xl bg-card">
        <DataTableProvider
          table={table}
          columns={ExpensesTableColumns}
          data={expenses}
        >
          <DataTable className="rounded-full">
            <DataTableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <DataTableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <DataTableHead
                      className="first:rounded-tl-xl last:rounded-tr-xl"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </DataTableHead>
                  ))}
                </DataTableRow>
              ))}
            </DataTableHeader>
            <DataTableBody className="rounded-xl">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <DataTableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <DataTableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </DataTableCell>
                    ))}
                  </DataTableRow>
                ))
              ) : (
                <DataTableRow>
                  <DataTableCell
                    colSpan={ExpensesTableColumns.length}
                    className="h-24 text-center"
                  >
                    Sem resultados.
                  </DataTableCell>
                </DataTableRow>
              )}
              {isAddingExpense && <AddExpenseRow />}
              <DataTableRow onClick={() => setIsAddingExpense(true)}>
                <DataTableCell
                  colSpan={ExpensesTableColumns.length}
                  className="hover:cursor-pointer font-medium"
                >
                  <div role="button" className="flex items-center gap-1">
                    Adicionar <Plus className="w-4 h-4 shrink-0" />
                  </div>
                </DataTableCell>
              </DataTableRow>
            </DataTableBody>
          </DataTable>
          <DataTablePagination />
        </DataTableProvider>
      </div>
    </FormWrapper>
  );
};

export default ExpensesTable;
