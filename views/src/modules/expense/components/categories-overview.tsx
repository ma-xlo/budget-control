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

const CategoriesOverview = () => {
  const {data: totalExpensesByCategory } = useQuery<>

  return (
    <TabsContent
      value="categories"
      className="
      grid
      grid-cols-1
      gap-4
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-3
      xl:grid-cols-3
      2xl:grid-cols-3
    "
    >
      <Card>
        <CardHeader>
          <CardTitle className="h6">Moradia</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="h6">Alimentação</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="h6">Vestuário</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="h6">Transporte</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="h6">Lazer</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="h6">Outros</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </TabsContent>
  );
};

export default CategoriesOverview;
