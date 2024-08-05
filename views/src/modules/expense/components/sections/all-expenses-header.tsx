import React from "react";
import { CardHeader, CardTitle } from "../../../core/components/ui/card";
import Text from "../../../core/components/ui/text";
import ExpensesSearchBar from "../expenses-search-bar";

const AllExpensesHeader = () => {
  return (
    <CardHeader>
      <CardTitle>Todas as contas</CardTitle>
    </CardHeader>
  );
};

export default AllExpensesHeader;
