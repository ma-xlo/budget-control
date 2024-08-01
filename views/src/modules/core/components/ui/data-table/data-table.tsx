import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { useDataTableContext } from './data-table-provider'
import { Table } from '@core/components/ui/table'
import { cn } from '@core/lib/utils'

interface DataTableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode
}

const DataTable = forwardRef<HTMLTableElement, DataTableProps>(
  ({ children, className, style, ...props }, ref) => {
    const { table } = useDataTableContext()

    return (
      <Table
        ref={ref}
        className={cn('min-w-full', className)}
        style={{ ...style, width: table.getTotalSize() }}
        {...props}
      >
        {children}
      </Table>
    )
  },
)

export default DataTable
