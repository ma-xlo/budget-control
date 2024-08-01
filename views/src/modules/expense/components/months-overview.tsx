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

const MonthsOverview = () => {
  return (
    <TabsContent value="months">
      <Card>
        <CardHeader>
          <CardTitle>Meses</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </TabsContent>
  );
};

export default MonthsOverview;
