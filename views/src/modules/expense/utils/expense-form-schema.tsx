import { z } from "zod";
import { moneyMask } from "./helpers";

export const ExpenseFormSchema = z.object({
  name: z
    .string({ required_error: "É necessário inserir o nome" })
    .min(1, "É necessário inserir o nome"),
  value: z
    .string({
      required_error: `É necessário preencher o valor`,
    })
    .transform((value) => moneyMask(value))
    .transform((value) => Number(value.replace(/\D/g, "")) / 100)
    .refine((value) => value !== 0, "O valor não pode ser R$ 0,00")
    .refine(
      (value) => value < 99999999999,
      "O valor máximo é R$ 999.999.999,00"
    ),
  category: z.number({
    required_error: "É necessário selecionar uma categoria",
  }),
  status: z
    .string({ required_error: "É necessário inserir o status" })
    .min(1, "É necessário inserir o status"),
  dueDate: z.date().optional(),
  paymentDate: z.date().optional(),
});

export type ExpenseFormValues = z.infer<typeof ExpenseFormSchema>;
