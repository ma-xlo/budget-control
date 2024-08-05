import { HTMLAttributes } from "react";
import { Badge } from "../../core/components/ui/badge";
import React from "react";
import { ExpenseStatus } from "../services/types";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../core/lib/utils";

type BadgeVariant = "green" | "red" | "blue" | "yellow";

const statusBadgeVariants = cva("rounded-full text-xs font-bold px-2 py-1 gap-1 flex items-center", {
  variants: {
    variant: {
      yellow:
        "border-yellow-200 bg-yellow-50 text-yellow-700 shadow hover:bg-yellow-100 dark:border-yellow-950 dark:bg-yellow-950/50 dark:text-yellow-600",
      blue: "border-blue-200 bg-blue-50 text-blue-700 shadow hover:bg-blue-100 dark:border-blue-950 dark:bg-blue-950/50 dark:text-blue-600",
      green:
        "border-green-200 bg-green-50 text-green-700 shadow hover:bg-green-100 dark:border-green-950 dark:bg-green-950/50 dark:text-green-600",
      red: "border-red-200 bg-red-50 text-red-700 shadow hover:bg-red-100 dark:border-red-950 dark:bg-red-950/50 dark:text-red-600",
    },
  },
  defaultVariants: {
    variant: "yellow",
  },
});

interface StatusBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: ExpenseStatus;
}

const StatusBadge = ({
  status,
  variant,
  className,
  ...props
}: StatusBadgeProps) => {
  return (
    <Badge className={cn(statusBadgeVariants({ variant }))} {...props}>
      <div
        className={cn(
          "w-2 h-2 shrink-0 rounded-full",
          status.color && `bg-${status.color}-500`
        )}
      ></div>
      {status.name}
    </Badge>
  );
};

export { StatusBadge, statusBadgeVariants, BadgeVariant };
