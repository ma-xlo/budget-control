import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AddExpensePayload } from "./types";
import { api } from "../../core/lib/axios";

export const useAddExpense = () =>
  useMutation<any, AxiosError, AddExpensePayload>({
    mutationFn: (newExpense: AddExpensePayload) => {
      return api.post("/expenses/", newExpense);
    },
  });
