import { TableRow } from '@core/components/ui/table'
import { cn } from '@core/lib/utils'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'

interface DataTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode
}

const DataTableRow = forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TableRow ref={ref} className={cn('', className)} {...props}>
        {children}
      </TableRow>
    )
  },
)

export default DataTableRow
