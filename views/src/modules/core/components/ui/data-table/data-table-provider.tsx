import { ColumnDef, Table } from "@tanstack/react-table";
import { createContext, ReactNode, useContext } from "react";

interface DataTableContextProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table: Table<TData>;
}

const DataTableContext = createContext<
  DataTableContextProps<any, any> | undefined
>(undefined);

interface DataTableProviderProps<TData, TValue>
  extends DataTableContextProps<TData, TValue> {
  children: ReactNode;
}

const DataTableProvider = <TData, TValue>({
  children,
  table,
  columns,
  data,
}: DataTableProviderProps<TData, TValue>) => {
  const value = {
    table,
    columns,
    data,
  };

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};

const useDataTableContext = <TData, TValue>(): DataTableContextProps<
  TData,
  TValue
> => {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error(
      "Data Table compound components cannot be rendered outside the DataTableProvider"
    );
  }

  return context as DataTableContextProps<TData, TValue>;
};

export { DataTableProvider, useDataTableContext };
