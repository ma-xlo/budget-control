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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@core/components/ui/tabs";
import CategoriesOverview from "./categories-overview";
import ResponsiblesOverview from "./responsible-overview";
import MonthsOverview from "./months-overview";

const OverviewTabs = () => {
  return (
    <Tabs defaultValue="categories" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="categories">Categorias</TabsTrigger>
        <TabsTrigger value="responsibles">Responsável</TabsTrigger>
        <TabsTrigger value="months">Mês</TabsTrigger>
      </TabsList>
      <CategoriesOverview />
      <ResponsiblesOverview />
      <MonthsOverview />
    </Tabs>
  );
};

export default OverviewTabs;
