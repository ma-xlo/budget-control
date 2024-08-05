import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginFormType } from "../utils/login-form-schema";
import { api } from "../../core/lib/axios";

export const useLogin = () => {
  return useMutation<any, AxiosError, LoginFormType>({
    mutationFn: (credentials: LoginFormType) => {
      return api.post("/auth/", credentials);
    },
  });
};
