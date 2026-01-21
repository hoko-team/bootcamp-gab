"use client";

import { List, Map } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { EventView } from "@/lib/types";

interface EventViewToggleProps {
  view: EventView;
  onViewChange: (view: EventView) => void;
  className?: string;
}

export function EventViewToggle({
  view,
  onViewChange,
  className,
}: EventViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(value) => {
        if (value) onViewChange(value as EventView);
      }}
      className={cn("", className)}
    >
      <ToggleGroupItem value="list" aria-label="Vue liste">
        <List className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="map" aria-label="Vue carte">
        <Map className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
