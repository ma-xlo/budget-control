import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@core/lib/utils'
import { TableHeader } from '@core/components/ui/table'

interface DataTableProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

const DataTableHeader = forwardRef<HTMLTableSectionElement, DataTableProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TableHeader ref={ref} className={cn('', className)} {...props}>
        {children}
      </TableHeader>
    )
  },
)

export default DataTableHeader
