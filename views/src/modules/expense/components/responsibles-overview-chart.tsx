"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent } from "@core/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@core/components/ui/chart";
import React, { HTMLAttributes } from "react";
import { UserExpensesTotal } from "../services/types";
import { useQuery } from "@tanstack/react-query";
import { keyGetUsersExpensesTotal } from "../services/keys";
import { cn } from "../../core/lib/utils";

const chartConfig = {
  responsible: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface ResponsiblesOverviewChartProps
  extends HTMLAttributes<HTMLDivElement> {}

const ResponsiblesOverviewChart = ({
  className,
  ...props
}: ResponsiblesOverviewChartProps) => {
  const { data: totalExpensesByUser } = useQuery<UserExpensesTotal[]>({
    queryKey: keyGetUsersExpensesTotal(),
  });

  return (
    <Card className={cn("", className)} {...[props]}>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={totalExpensesByUser}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-responsible)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ResponsiblesOverviewChart;
