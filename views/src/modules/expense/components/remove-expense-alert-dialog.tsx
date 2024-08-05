import {
  ResponsiveAlertDialog,
  ResponsiveAlertDialogAction,
  ResponsiveAlertDialogCancel,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogDescription,
  ResponsiveAlertDialogFooter,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogTrigger,
} from "../../core/components/ui/responsive-alert-dialog";
import { Button, buttonVariants } from "@core/components/ui/button";
import { ReactNode, useState } from "react";
import { cn } from "@core/lib/utils";
import React from "react";
import Text from "../../core/components/ui/text";
import { useExpenseContext } from "../context/expense-provider";
import { useRemoveExpense } from "../services"; 

interface RemoveExpenseDialogProps {
  children?: ReactNode;
}

const RemoveExpenseDialog = ({ children }: RemoveExpenseDialogProps) => {
  const [open, setOpen] = useState(false);
  const { expense } = useExpenseContext();
  const { mutate: removeExpense, isPending: isRemoving } = useRemoveExpense(
    expense.id
  );

  const handleRemoveExpense = () => {
    removeExpense(
      {},
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <ResponsiveAlertDialog open={open} onOpenChange={setOpen}>
      <ResponsiveAlertDialogTrigger
        className={cn("flex h-full w-full items-center gap-1 text-destructive")}
      >
        {children ? children : <Text>Remover despesa</Text>}
      </ResponsiveAlertDialogTrigger>
      <ResponsiveAlertDialogContent>
        <ResponsiveAlertDialogHeader>
          <ResponsiveAlertDialogTitle>Tem certeza?</ResponsiveAlertDialogTitle>
          <ResponsiveAlertDialogDescription>
            Isso irá remover a despesa permanentemente
          </ResponsiveAlertDialogDescription>
        </ResponsiveAlertDialogHeader>
        <ResponsiveAlertDialogFooter className=" flex-col-reverse md:flex-row">
          <ResponsiveAlertDialogCancel asChild>
            <Button variant="outline" disabled={isRemoving}>
              Fechar
            </Button>
          </ResponsiveAlertDialogCancel>
          <ResponsiveAlertDialogAction asChild>
            <Button
              className={cn(
                "gap-1",
                buttonVariants({ variant: "destructive" })
              )}
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault();
                handleRemoveExpense();
              }}
              disabled={isRemoving}
            >
              <Text>Remover</Text>
            </Button>
          </ResponsiveAlertDialogAction>
        </ResponsiveAlertDialogFooter>
      </ResponsiveAlertDialogContent>
    </ResponsiveAlertDialog>
  );
};

export default RemoveExpenseDialog;
