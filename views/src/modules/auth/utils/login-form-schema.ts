import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "É necessário inserir o e-mail" })
    .min(1, "É necessário inserir o e-mail")
    .email({ message: "E-mail inválido" }),
  password: z
    .string({
      required_error: "É necessário inserir a senha",
    })
    .min(1, "É necessário inserir a senha"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
