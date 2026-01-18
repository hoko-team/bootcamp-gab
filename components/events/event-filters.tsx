"use client";

import { MapPin, Calendar, Tag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type {
  Event,
  FilterParams,
  EventType,
  PeriodFilter,
  CityFilter,
} from "@/lib/utils/filter-events";
import { calculateFilterCounts } from "@/lib/utils/filter-events";
import { cn } from "@/lib/utils";

const CITIES: CityFilter[] = ["Lille", "Paris", "Lyon", "Remote"];

const EVENT_TYPES: Array<{ value: EventType | "all"; label: string }> = [
  { value: "all", label: "Tous" },
  { value: "meetup", label: "Meetup" },
  { value: "webinar", label: "Webinar" },
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conférence" },
];

const PERIOD_OPTIONS: Array<{ value: PeriodFilter; label: string }> = [
  { value: "all", label: "Tous les événements" },
  { value: "upcoming", label: "À venir uniquement" },
  { value: "replays", label: "Replays disponibles" },
];

interface EventFiltersProps {
  events: Event[];
  filters: FilterParams;
  onFilterChange: (filters: Partial<FilterParams>) => void;
  onReset: () => void;
  className?: string;
}

export function EventFilters({
  events,
  filters,
  onFilterChange,
  onReset,
  className,
}: EventFiltersProps) {
  const counts = calculateFilterCounts(events);

  // Handle city checkbox toggle
  const handleCityToggle = (city: string) => {
    const currentCities = filters.cities;
    const newCities = currentCities.includes(city)
      ? currentCities.filter((c) => c !== city)
      : [...currentCities, city];

    onFilterChange({ cities: newCities });
  };

  const hasActiveFilters =
    filters.cities.length > 0 ||
    filters.type !== "all" ||
    filters.period !== "all";

  return (
    <div className={cn("space-y-6", className)}>
      {/* City Filters */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Ville</h3>
        </div>
        <div className="space-y-3">
          {CITIES.map((city) => {
            const count = counts.byCity[city] || 0;
            const isChecked = filters.cities.includes(city);
            const isDisabled = count === 0;

            return (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox
                  id={`city-${city}`}
                  checked={isChecked}
                  onCheckedChange={() => handleCityToggle(city)}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`city-${city}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1",
                    isDisabled && "text-muted-foreground opacity-50"
                  )}
                >
                  {city}{" "}
                  <span className="text-muted-foreground">({count})</span>
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Type Filters */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Type d&apos;événement</h3>
        </div>
        <RadioGroup
          value={filters.type}
          onValueChange={(value) =>
            onFilterChange({ type: value as EventType | "all" })
          }
        >
          {EVENT_TYPES.map((type) => {
            const count =
              type.value === "all"
                ? events.length
                : counts.byType[type.value] || 0;
            const isDisabled = count === 0 && type.value !== "all";

            return (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={type.value}
                  id={`type-${type.value}`}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`type-${type.value}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1",
                    isDisabled && "text-muted-foreground opacity-50",
                    filters.type === type.value && "font-medium"
                  )}
                >
                  {type.label}{" "}
                  <span className="text-muted-foreground">({count})</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <Separator />

      {/* Period Filters */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Période</h3>
        </div>
        <RadioGroup
          value={filters.period}
          onValueChange={(value) =>
            onFilterChange({ period: value as PeriodFilter })
          }
        >
          {PERIOD_OPTIONS.map((period) => {
            const count = counts.byPeriod[period.value];
            const isDisabled = count === 0 && period.value !== "all";

            return (
              <div key={period.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={period.value}
                  id={`period-${period.value}`}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`period-${period.value}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1",
                    isDisabled && "text-muted-foreground opacity-50",
                    filters.period === period.value && "font-medium"
                  )}
                >
                  {period.label}{" "}
                  <span className="text-muted-foreground">({count})</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full"
          >
            Réinitialiser les filtres
          </Button>
        </>
      )}
    </div>
  );
}
