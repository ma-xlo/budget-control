export type Expense = {
  id: number;
  name: string;
  value: number;
  userId: number;
  status: string;
  category: number;
  dueDate: string;
  paymentDate: string;
};

export type ExpenseStatus = {
  id: number;
  name: string;
  color: string;
};

export type AddExpensePayload = {
  name: string;
  value: number;
  status?: string;
  category: number;
  dueDate?: Date | undefined;
  paymentDate?: Date | undefined;
};

export type CategoryExpensesTotal = {
  category: number;
  quantity: number;
  total: number;
};

export type UserExpensesTotal = {
  name: string;
  quantity: number;
  total: number;
};

export type MonthExpensesTotal = {
  month: number;
  year: number;
  quantity: number;
  total: number;
};
