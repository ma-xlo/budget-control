import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@core/components/ui/card";
import { TabsContent } from "@core/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MonthExpensesTotal, UserExpensesTotal } from "../services/types";
import {
  keyGetMonthsExpensesTotal,
  keyGetUsersExpensesTotal,
} from "../services/keys";

import { moneyMask } from "../utils/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../core/components/ui/default-tooltip";
import { Badge } from "../../core/components/ui/badge";
import MonthsOverviewChart from "./months-overview-chart";

const MonthsOverview = () => {
  const { data: totalExpensesByUser } = useQuery<MonthExpensesTotal[]>({
    queryKey: keyGetMonthsExpensesTotal(),
  });

  return (
    <TabsContent
      value="months"
      className="grid grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4"
    >
      <div className="grid grid-cols-2 grid-rows-3 gap-2 xl:col-span-2 lg:col-span-1">
        {totalExpensesByUser?.map((responsible) => (
          <Card
            key={responsible.month}
            className="flex flex-col justify-between"
          >
            <CardHeader className="p-4 md:p-4">
              <CardTitle className="h6">{responsible.month}</CardTitle>
            </CardHeader>
            <CardFooter className="justify-between w-full flex items-center p-4 md:p-4">
              <Tooltip>
                <TooltipTrigger>
                  <Badge>{moneyMask(responsible.total.toString())}</Badge>
                </TooltipTrigger>
                <TooltipContent>Total</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>{responsible.quantity}</TooltipTrigger>
                <TooltipContent>Quantidade</TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>

      <MonthsOverviewChart className="col-span-1 xl:col-span-1 lg:col-span-2" />
    </TabsContent>
  );
};

export default MonthsOverview;
