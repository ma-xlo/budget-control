import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AddExpensePayload } from "./types";
import { api } from "../../core/lib/axios";
import { toast } from "sonner";
import { queryClient } from "../../core/lib/react-query";
import { keyListExpenses } from "./keys";
import { ExpenseFormValues } from "../utils/expense-form-schema";

export const useAddExpense = () =>
  useMutation<any, AxiosError, AddExpensePayload>({
    mutationFn: (newExpense: AddExpensePayload) => {
      return api.post("/expenses/", newExpense);
    },
  });

export const useRemoveExpense = (expenseId: number) =>
  useMutation<any, AxiosError, Record<string, never>>({
    mutationFn: () => {
      return api.delete(`/expenses/${expenseId}/`);
    },
    onSuccess: () => {
      toast.success(`Despesa removida com sucesso`);
      queryClient.invalidateQueries({
        queryKey: keyListExpenses(),
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro remover a despesa");
    },
  });

export const useEditExpense = (expenseId: number) =>
  useMutation<any, AxiosError, ExpenseFormValues>({
    mutationFn: (expenseNewData: ExpenseFormValues) => {
      return api.put(`/expenses/${expenseId}/`, expenseNewData);
    },
    onSuccess: () => {
      toast.success(`Despesa atualizada com sucesso`);
      queryClient.invalidateQueries({
        queryKey: keyListExpenses(),
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro atualizar a despesa");
    },
  });
