"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { EventFilters, EventPeriod } from "@/lib/types";

interface EventFiltersProps {
  filters: EventFilters;
  availableCities: string[];
  availableTypes: string[];
  availableTags: string[];
  resultCount: number;
  onToggleCity: (city: string) => void;
  onToggleType: (type: string) => void;
  onToggleTag: (tag: string) => void;
  onSetPeriod: (period: EventPeriod) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  className?: string;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  meetup: "Meetup",
  workshop: "Workshop",
  webinar: "Webinar",
  conference: "Conférence",
};

const PERIOD_LABELS: Record<EventPeriod, string> = {
  all: "Tous",
  upcoming: "À venir",
  past: "Passés",
};

function FilterContent({
  filters,
  availableCities,
  availableTypes,
  availableTags,
  onToggleCity,
  onToggleType,
  onToggleTag,
  onSetPeriod,
}: Omit<
  EventFiltersProps,
  "resultCount" | "onReset" | "hasActiveFilters" | "className"
>) {
  return (
    <div className="space-y-6">
      {/* Period Toggle */}
      <div>
        <h4 className="text-sm font-medium mb-3">Période</h4>
        <ToggleGroup
          type="single"
          value={filters.period}
          onValueChange={(value) => {
            if (value) onSetPeriod(value as EventPeriod);
          }}
          className="justify-start"
        >
          {Object.entries(PERIOD_LABELS).map(([value, label]) => (
            <ToggleGroupItem key={value} value={value} size="sm">
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Cities */}
      <div>
        <h4 className="text-sm font-medium mb-3">Ville</h4>
        <div className="space-y-2">
          {availableCities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city}`}
                checked={filters.cities.includes(city)}
                onCheckedChange={() => onToggleCity(city)}
              />
              <label
                htmlFor={`city-${city}`}
                className="text-sm cursor-pointer"
              >
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Event Types */}
      <div>
        <h4 className="text-sm font-medium mb-3">Type</h4>
        <div className="space-y-2">
          {availableTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={() => onToggleType(type)}
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm cursor-pointer"
              >
                {EVENT_TYPE_LABELS[type] || type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-sm font-medium mb-3">Tags</h4>
        <div className="flex flex-wrap gap-1">
          {availableTags.map((tag) => {
            const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
            const isSelected = filters.tags.includes(cleanTag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onToggleTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function EventFilters({
  filters,
  availableCities,
  availableTypes,
  availableTags,
  resultCount,
  onToggleCity,
  onToggleType,
  onToggleTag,
  onSetPeriod,
  onReset,
  hasActiveFilters,
  className,
}: EventFiltersProps) {
  const activeFiltersCount =
    filters.cities.length +
    filters.types.length +
    filters.tags.length +
    (filters.period !== "all" ? 1 : 0);

  return (
    <div className={cn("", className)}>
      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </span>
              <span className="text-muted-foreground">
                {resultCount} résultat{resultCount > 1 ? "s" : ""}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Filtres
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={onReset}>
                    <X className="w-4 h-4 mr-1" />
                    Réinitialiser
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent
                filters={filters}
                availableCities={availableCities}
                availableTypes={availableTypes}
                availableTags={availableTags}
                onToggleCity={onToggleCity}
                onToggleType={onToggleType}
                onToggleTag={onToggleTag}
                onSetPeriod={onSetPeriod}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres
          </h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X className="w-4 h-4 mr-1" />
              Réinitialiser
            </Button>
          )}
        </div>
        <FilterContent
          filters={filters}
          availableCities={availableCities}
          availableTypes={availableTypes}
          availableTags={availableTags}
          onToggleCity={onToggleCity}
          onToggleType={onToggleType}
          onToggleTag={onToggleTag}
          onSetPeriod={onSetPeriod}
        />
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {resultCount} événement{resultCount > 1 ? "s" : ""} trouvé
            {resultCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
