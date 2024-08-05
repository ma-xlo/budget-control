import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "../../core/components/ui/responsive-dialog";
import { ReactNode, useState } from "react";
import { cn } from "@core/lib/utils";
import React from "react";
import Text from "../../core/components/ui/text";
import EditExpenseForm from "./edit-expense-form";
import { Button } from "../../core/components/ui/button";

interface EditExpenseDialogProps {
  children?: ReactNode;
}

const EditExpenseDialog = ({ children }: EditExpenseDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger
        className={cn("flex h-full w-full items-center gap-1")}
      >
        <Button
          variant="ghost"
          className="px-2 w-full justify-start h-fit font-normal"
        >
          Editar despesa
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Editar despesa</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Edite a despesa aqui
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <div className="p-4 md:p-0">
          <EditExpenseForm onClose={() => setOpen(false)} />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default EditExpenseDialog;
