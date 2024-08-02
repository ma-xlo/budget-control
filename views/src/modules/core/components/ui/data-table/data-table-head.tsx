import { TableHead } from "@core/components/ui/table";
import { cn } from "@core/lib/utils";
import { forwardRef, ReactNode, ThHTMLAttributes } from "react";

interface DataTableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  headerSize?: number;
}

const DataTableHead = forwardRef<HTMLTableCellElement, DataTableHeadProps>(
  ({ children, headerSize, className, style, ...props }, ref) => {
    return (
      <TableHead
        ref={ref}
        className={cn("relative", className)}
        style={{ ...style, width: headerSize }}
        {...props}
      >
        {children}
      </TableHead>
    );
  }
);

export default DataTableHead;
