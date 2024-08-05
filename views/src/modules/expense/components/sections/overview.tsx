import { HTMLAttributes } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../core/components/ui/card";
import Text from "../../../core/components/ui/text";
import OverviewTabs from "../overview-tabs";
import React from "react";

interface ExpensesOverviewProps extends HTMLAttributes<HTMLDivElement> {}

const ExpensesOverview = ({ ...props }: ExpensesOverviewProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
      </CardHeader>
      <CardContent>
        <OverviewTabs />
      </CardContent>
    </Card>
  );
};

export default ExpensesOverview;
