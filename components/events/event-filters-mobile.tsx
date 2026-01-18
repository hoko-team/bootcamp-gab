"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { EventFilters } from "./event-filters";
import type { Event, FilterParams } from "@/lib/utils/filter-events";

interface EventFiltersMobileProps {
  events: Event[];
  filters: FilterParams;
  onFilterChange: (filters: Partial<FilterParams>) => void;
  onReset: () => void;
  activeFilterCount: number;
}

export function EventFiltersMobile({
  events,
  filters,
  onFilterChange,
  onReset,
  activeFilterCount,
}: EventFiltersMobileProps) {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterParams>) => {
    onFilterChange(newFilters);
    // Optionally close the sheet after filter change
    // setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="lg:hidden fixed bottom-6 right-6 z-50 shadow-lg"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Filtrer les événements</SheetTitle>
          <SheetDescription>
            Affinez votre recherche par ville, type et période
          </SheetDescription>
        </SheetHeader>
        <EventFilters
          events={events}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </SheetContent>
    </Sheet>
  );
}
