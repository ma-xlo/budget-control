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
  total: number;
};

export type ResponsbileExpenses = {
  
}


