import { Button } from "@core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@core/components/ui/card";
import { Input } from "@core/components/ui/input";
import { Label } from "@core/components/ui/label";
import { TabsContent } from "@core/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CategoryExpensesTotal } from "../services/types";
import { keyGetCategoriesExpensesTotal } from "../services/keys";
import CategoriesOverviewChart from "./categories-overview-chart";
import { moneyMask } from "../utils/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../core/components/ui/default-tooltip";
import { Badge } from "../../core/components/ui/badge";

const CategoriesOverview = () => {
  const { data: totalExpensesByCategory } = useQuery<CategoryExpensesTotal[]>({
    queryKey: keyGetCategoriesExpensesTotal(),
  });

  return (
    <TabsContent
      value="categories"
      className="grid grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4"
    >
      <div className="grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 lg:grid-cols-2 grid-rows-3 gap-2 xl:col-span-2 lg:col-span-1">
        {totalExpensesByCategory?.map((category) => (
          <Card
            key={category.category}
            className="flex flex-col justify-between"
          >
            <CardHeader className="p-4 md:p-4">
              <CardTitle className="h6">{category.category}</CardTitle>
            </CardHeader>
            <CardFooter className="justify-between w-full flex items-center p-4 md:p-4">
              <Tooltip>
                <TooltipTrigger>
                  <Badge>{moneyMask(category.total.toString())}</Badge>
                </TooltipTrigger>
                <TooltipContent>Total</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>{category.quantity}</TooltipTrigger>
                <TooltipContent>Quantidade</TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CategoriesOverviewChart className="col-span-1 xl:col-span-1 lg:col-span-2" />
    </TabsContent>
  );
};

export default CategoriesOverview;
