import { Button, buttonVariants } from "@core/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { HTMLAttributes, ReactNode, useState } from "react";

interface ColumnSortingProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  column: any;
  children: ReactNode;
}

const ColumnSorting = ({ column, children }: ColumnSortingProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button
      variant="ghost"
      onClick={() => {
        if (column.getIsSorted() === "desc") {
          column.clearSorting();
          return;
        }

        column.toggleSorting(column.getIsSorted() === "asc");
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      <div className="h-4 w-4">
        {!column.getIsSorted() && isHovering && (
          <ArrowUpDown className="ml-2 h-4 w-4 transition-all" />
        )}
        {column.getIsSorted() === "asc" && (
          <ArrowDown className="ml-2 h-4 w-4  transition-all" />
        )}
        {column.getIsSorted() === "desc" && (
          <ArrowUp className="ml-2 h-4 w-4  transition-all" />
        )}
      </div>
    </Button>
  );
};

export default ColumnSorting;
