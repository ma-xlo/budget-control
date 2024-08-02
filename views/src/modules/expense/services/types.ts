export type Expense = {
  name: string;
  value: number;
  responsible: number;
  status: string;
  category: number;
  dueDate: string;
  paymentDate: string;
};

export type AddExpensePayload = {
  name: string;
  value: number;
  responsible: number;
  status: string;
  category: number;
  dueDate: string;
  paymentDate: string;
};
