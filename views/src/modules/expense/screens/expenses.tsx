import { useQuery } from "@tanstack/react-query";
import { keyListExpenses } from "../services/keys";
import Text from "../../core/components/ui/text";
import ExpensesOverview from "../components/sections/overview";
import { ThemeToggle } from "../../core/components/theme-toggle";
import AllExpenses from "../components/sections/all-expenses";

const ExpensesScreen = () => {
  const { data: expenses } = useQuery<any>({
    queryKey: keyListExpenses(),
  });

  return (
    <main className="p-6 min-h-svh h-fit space-y-6 bg-secondary/30">
      <Text tag="h1">Despesas</Text>
      <div className="space-y-4">
        <ExpensesOverview />
        <AllExpenses />
      </div>
    </main>
  );
};

export default ExpensesScreen;
