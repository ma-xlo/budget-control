import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    firstName: z
      .string({ required_error: "É necessário inserir o nome" })
      .min(1, "É necessário inserir o nome"),
    lastName: z
      .string({ required_error: "É necessário inserir o sobrenome" })
      .min(1, "É necessário inserir o sobrenome"),
    cpf: z
      .string({ required_error: "É necessário inserir o CPF" })
      .min(1, "É necessário inserir o CPF"),
    role: z
      .string({ required_error: "É necessário inserir a sua ocupação" })
      .min(1, "É necessário inserir a sua ocupação"),
    email: z
      .string({ required_error: "É necessário inserir o e-mail" })
      .min(1, "É necessário inserir o e-mail")
      .email({ message: "E-mail inválido" }),
    password: z
      .string({
        required_error: "É necessário inserir a senha",
      })
      .min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string({
        required_error: "É necessário confirmar a senha",
      })
      .min(1, "É necessário confirmar a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
