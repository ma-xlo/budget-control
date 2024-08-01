import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../core/components/ui/card";
import Text from "../../../core/components/ui/text";
import OverviewTabs from "../overview-tabs";

const ExpensesOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h2">Visão Geral</CardTitle>
      </CardHeader>
      <CardContent>
        <OverviewTabs />
      </CardContent>
    </Card>
  );
};

export default ExpensesOverview;
