import { queryOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterFormType } from "../utils/register-form-schema";
import { api } from "../../core/lib/axios";
import { keyGetMe } from "./keys";

export const useRegister = () => {
  return useMutation<
    any,
    AxiosError,
    Omit<RegisterFormType, "passwordConfirm">
  >({
    mutationFn: (userInfo: Omit<RegisterFormType, "passwordConfirm">) => {
      return api.post("/users/", userInfo);
    },
  });
};

export const getMeOptions = queryOptions({
  queryKey: keyGetMe(),
  staleTime: Infinity,
});
