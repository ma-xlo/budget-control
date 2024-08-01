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

const CategoriesOverview = () => {
  return (
    <TabsContent value="categories">
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </TabsContent>
  );
};

export default CategoriesOverview;
