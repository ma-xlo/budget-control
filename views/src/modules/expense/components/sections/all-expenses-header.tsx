import { CardHeader, CardTitle } from "../../../core/components/ui/card";
import Text from "../../../core/components/ui/text";

const AllExpensesHeader = () => {
  return (
    <CardHeader>
      <CardTitle>
        <Text tag="h3">Todas as contas</Text>
      </CardTitle>
    </CardHeader>
  );
};

export default AllExpensesHeader;
