import { cn } from "@core/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../core/components/ui/input";
import React from "react";

interface ExpensesSearchBarProps {
  onChange: (value: string) => void;
}

const ExpensesSearchBar = ({ onChange }: ExpensesSearchBarProps) => {
  const [search, setSearch] = useSearchParams();
  const initialValue = search.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearchChange();
  }, [debouncedSearchTerm]);

  const onSearchChange = () => {
    if (debouncedSearchTerm.length === 0) {
      search.delete("search");
      setSearch(search, {
        replace: true,
      });

      onChange(debouncedSearchTerm);

      return;
    }

    search.set("search", debouncedSearchTerm);
    setSearch(search, {
      replace: true,
    });

    onChange(debouncedSearchTerm);
  };

  return (
    <div className="relative">
      <Search className="absolute bottom-0 left-3 top-0 z-10 my-auto h-3 w-3 text-muted-foreground" />
      <Input
        type="text"
        className={cn(
          "bg-background rounded-full pl-7 text-sm font-medium transition hover:opacity-100 focus:opacity-100 max-w-sm",
          searchTerm && "opacity-100"
        )}
        placeholder="Pesquisar despesa..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
    </div>
  );
};

export default ExpensesSearchBar;
