import React, { useState } from "react";
import {
  ResponsivePopover,
  ResponsivePopoverContent,
  ResponsivePopoverTrigger,
} from "./responsive-popover";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Calendar } from "./calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DatePickerProps {
  onSelectDate: (date: Date) => void;
  selected?: Date;
}

const DatePicker = ({ onSelectDate, selected }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(selected);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(new Date());

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      onSelectDate(date);
    }
  };

  return (
    <ResponsivePopover modal={true} open={open} onOpenChange={setOpen}>
      <ResponsivePopoverTrigger asChild className="max-w-full overflow-hidden">
        <Button
          variant={"outline"}
          className={cn(
            "justify-start border-none bg-transparent pl-3 text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>Selecione a data</span>
          )}
        </Button>
      </ResponsivePopoverTrigger>
      <ResponsivePopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) => {
            const date = addDays(new Date(), parseInt(value));
            setMonth(date);
            handleSelectDate(date);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Hoje</SelectItem>
            <SelectItem value="1">Amanhã</SelectItem>
            <SelectItem value="3">Em 3 dias</SelectItem>
            <SelectItem value="7">Em uma semana</SelectItem>
            <SelectItem value="14">Em duas semanas</SelectItem>
            <SelectItem value="30">Em um mês</SelectItem>
            <SelectItem value="90">Em 3 meses</SelectItem>
          </SelectContent>
        </Select>
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date ?? undefined}
          month={month}
          onSelect={handleSelectDate}
        />
      </ResponsivePopoverContent>
    </ResponsivePopover>
  );
};

export default DatePicker;
