import React from "react";
import { Checkbox } from "../../core/components/ui/checkbox";
import {
  DataTableCell,
  DataTableRow,
} from "../../core/components/ui/data-table";

const AddExpenseRowForm = () => {
  return (
    <DataTableRow>
      <DataTableCell>
        <Checkbox disabled />
      </DataTableCell>
      <DataTableCell>asdadd</DataTableCell>
      <DataTableCell>asdasdasdasdadd</DataTableCell>
    </DataTableRow>
  );
};

export default AddExpenseRowForm;
