"use client";

import { CalendarX } from "lucide-react";
import { EventCard } from "./event-card";
import { cn } from "@/lib/utils";
import type { EventJSON } from "@/lib/types";

interface EventListProps {
  events: EventJSON[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function EventList({
  events,
  selectedTags,
  onTagClick,
  className,
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarX className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Aucun événement trouvé</h3>
        <p className="text-muted-foreground max-w-md">
          Aucun événement ne correspond à vos critères de recherche. Essayez de
          modifier vos filtres.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          selectedTags={selectedTags}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
