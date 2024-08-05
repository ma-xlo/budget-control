import {
  ResponsiveDropdownContent,
  ResponsiveDropdownLabel,
  ResponsiveDropdownMenu,
  ResponsiveDropdownMenuHeader,
  ResponsiveDropdownMenuItem,
  ResponsiveDropdownMenuSeparator,
  ResponsiveDropdownTrigger,
} from "../../core/components/ui/responsive-dropdown-menu";
import { Button } from "../../core/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import RemoveExpenseDialog from "./remove-expense-alert-dialog";
import EditExpenseDialog from "./edit-expense-dialog";

const ExpenseOptionsDropdownMenu = () => {
  return (
    <ResponsiveDropdownMenu>
      <ResponsiveDropdownTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </ResponsiveDropdownTrigger>

      <ResponsiveDropdownContent align="end">
        <ResponsiveDropdownMenuHeader>
          <ResponsiveDropdownLabel>Ações</ResponsiveDropdownLabel>
        </ResponsiveDropdownMenuHeader>
        <ResponsiveDropdownMenuSeparator />
        <ResponsiveDropdownMenuItem
          onClick={(e: { preventDefault: () => any }) => e.preventDefault()}
          asChild
        >
          <EditExpenseDialog />
        </ResponsiveDropdownMenuItem>
        <ResponsiveDropdownMenuItem
          onClick={(e: { preventDefault: () => any }) => e.preventDefault()}
        >
          <RemoveExpenseDialog />
        </ResponsiveDropdownMenuItem>
      </ResponsiveDropdownContent>
    </ResponsiveDropdownMenu>
  );
};

export default ExpenseOptionsDropdownMenu;
