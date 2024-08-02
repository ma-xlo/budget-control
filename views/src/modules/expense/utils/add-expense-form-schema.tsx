import { z } from "zod";

export const AddExpenseFormSchema = z.object({
  name: z
    .string({ required_error: "É necessário inserir o nome" })
    .min(1, "É necessário inserir o nome"),
  value: z
    .string({
      required_error: `É necessário preencher o valor`,
    })
    .transform((value) => Number(value.replace(/\D/g, "")) / 100)
    .refine((value) => value !== 0, "O valor não pode ser R$ 0,00")
    .refine(
      (value) => value < 99999999999,
      "O valor máximo é R$ 999.999.999,00"
    ),
  responsible: z.number({
    required_error: "É necessário selecionar um responsável",
  }),
  category: z.number({
    required_error: "É necessário selecionar uma categoria",
  }),
  dueDate: z.string().optional(),
  paymentDate: z.string().optional(),
});
