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

const ExpensesTable = () => {
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
    <div className="border rounded-xl">
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
                    headerSize={header.getSize()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* <ColumnResizer header={header} /> */}
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
                    <DataTableCell
                      key={cell.id}
                      cellWidth={cell.column.getSize()}
                      cellMinWidth={cell.column.columnDef.minSize}
                    >
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
          </DataTableBody>
        </DataTable>
        <DataTablePagination />
      </DataTableProvider>
    </div>
  );
};

export default ExpensesTable;
