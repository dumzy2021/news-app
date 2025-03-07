import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export type NewsFilterState = {
  search: string;
  sortBy?: string;
  dateRange?: DateRange;
};

type NewsFiltersProps = {
  onFilterChange: (filters: NewsFilterState) => void;
  sortByOptions?: { label: string; value: string }[];
  sortByPlaceholder?: string;
  hideDate?: boolean;
};

export const NewsFilters = ({
  onFilterChange,
  sortByOptions,
  sortByPlaceholder = "Sort by",
  hideDate = false,
}: NewsFiltersProps) => {
  const [filters, setFilters] = useState<NewsFilterState>({
    search: "",
    sortBy: "",
    dateRange: undefined,
  });

  const handleFilterChange = (newFilters: Partial<NewsFilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search Input */}
      <Input
        placeholder="Search news..."
        value={filters.search}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
        className="w-full sm:w-64"
      />

      {/* Sort Dropdown (Only if sortByOptions are provided) */}
      {sortByOptions && sortByOptions.length > 0 && (
        <Select
          onValueChange={(value) => handleFilterChange({ sortBy: value })}
          defaultValue={filters.sortBy}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder={sortByPlaceholder} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sortByOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Date Filters */}

      {!hideDate && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full max-w-[280px] justify-start text-left font-normal",
                !filters.dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                    {format(filters.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filters.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) => handleFilterChange({ dateRange: range })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
