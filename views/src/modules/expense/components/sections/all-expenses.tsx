import React, { HTMLAttributes } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../core/components/ui/card";
import Text from "../../../core/components/ui/text";
import ExpensesTable from "../expenses-table";
import OverviewTabs from "../overview-tabs";
import AllExpensesHeader from "./all-expenses-header";

interface AllExpensesProps extends HTMLAttributes<HTMLDivElement> {}

const AllExpenses = ({ ...props }: AllExpensesProps) => {
  return (
    <Card {...props}>
      <AllExpensesHeader />
      <CardContent>
        <ExpensesTable />
      </CardContent>
    </Card>
  );
};

export default AllExpenses;
