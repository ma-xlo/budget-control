import { QueryKey } from "@tanstack/react-query";

export const keyListExpenses = (): QueryKey => ["expenses"];

export const keyGetCategoriesExpensesTotal = (): QueryKey => [
  "expenses",
  "total",
  "categories",
];

export const keyGetUsersExpensesTotal = (): QueryKey => [
  "expenses",
  "total",
  "users",
];

export const keyGetMonthsExpensesTotal = (): QueryKey => [
  "expenses",
  "total",
  "paymentDate",
];
