"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@core/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@core/components/ui/chart";
import React, { HTMLAttributes } from "react";
import { CategoryExpensesTotal } from "../services/types";
import { useQuery } from "@tanstack/react-query";
import { keyGetCategoriesExpensesTotal } from "../services/keys";
import { cn } from "../../core/lib/utils";

const chartConfig = {
  category: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface CategoriesOverviewChartProps extends HTMLAttributes<HTMLDivElement> {}

const CategoriesOverviewChart = ({
  className,
  ...props
}: CategoriesOverviewChartProps) => {
  const { data: totalExpensesByCategory } = useQuery<CategoryExpensesTotal[]>({
    queryKey: keyGetCategoriesExpensesTotal(),
  });

  return (
    <Card className={cn("", className)} {...[props]}>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={totalExpensesByCategory}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-category)" radius={8}>
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

export default CategoriesOverviewChart;
