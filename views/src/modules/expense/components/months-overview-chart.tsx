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
import { MonthExpensesTotal } from "../services/types";
import { useQuery } from "@tanstack/react-query";
import { keyGetMonthsExpensesTotal } from "../services/keys";
import { cn } from "../../core/lib/utils";

const chartConfig = {
  month: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface MonthsOverviewChartProps extends HTMLAttributes<HTMLDivElement> {}

const MonthsOverviewChart = ({
  className,
  ...props
}: MonthsOverviewChartProps) => {
  const { data: totalExpensesByMonth } = useQuery<MonthExpensesTotal[]>({
    queryKey: keyGetMonthsExpensesTotal(),
  });

  return (
    <Card className={cn("", className)} {...[props]}>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={totalExpensesByMonth}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-month)" radius={8}>
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

export default MonthsOverviewChart;
