import { TableBody } from '@core/components/ui/table'
import { cn } from '@core/lib/utils'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'

interface DataTableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

const DataTableBody = forwardRef<HTMLTableSectionElement, DataTableBodyProps>(
  ({ children, className, ...props }, ref) => (
    <TableBody ref={ref} className={cn('', className)} {...props}>
      {children}
    </TableBody>
  ),
)

export default DataTableBody
