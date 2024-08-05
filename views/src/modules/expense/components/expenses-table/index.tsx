import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { useAddExpenseFormProvider } from "../../context/add-expense-form-provider";
import { Plus } from "lucide-react";
import FormWrapper from "../form-wrapper";
import AddExpenseRow from "../add-expense-row";
import { ExpenseProvider } from "../../context/expense-provider";
import ExpensesSearchBar from "../expenses-search-bar";
import { Separator } from "../../../core/components/ui/separator";

const ExpensesTable = () => {
  const { isAddingExpense, setIsAddingExpense } = useAddExpenseFormProvider();
  const { data: expenses, status: statusListExpenses } = useQuery<Expense[]>({
    queryKey: keyListExpenses(),
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: expenses as Expense[],
    columns: ExpensesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (statusListExpenses === "error") {
    return <div>Erro ao carregar as despesas</div>;
  }

  if (statusListExpenses === "pending") {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <FormWrapper>
        <DataTableProvider
          table={table}
          columns={ExpensesTableColumns}
          data={expenses}
        >
          <div>
            <ExpensesSearchBar onChange={(value) => setGlobalFilter(value)} />
          </div>
          <Separator />
          <div className="border rounded-xl bg-card">
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
                    <ExpenseProvider key={row.id} expense={row.original}>
                      {
                        <DataTableRow
                          data-state={row.getIsSelected() && "selected"}
                          className="hover:cursor-pointer"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <DataTableCell key={cell.id} className="p-4">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </DataTableCell>
                          ))}
                        </DataTableRow>
                      }
                    </ExpenseProvider>
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
                    className="hover:cursor-pointer font-medium p-4"
                  >
                    <div role="button" className="flex items-center gap-1">
                      Adicionar <Plus className="w-4 h-4 shrink-0" />
                    </div>
                  </DataTableCell>
                </DataTableRow>
              </DataTableBody>
            </DataTable>
            <DataTablePagination />
          </div>
        </DataTableProvider>
      </FormWrapper>
    </div>
  );
};

export default ExpensesTable;
