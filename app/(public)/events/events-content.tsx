"use client";

import { Suspense, useMemo } from "react";
import { useEventFilters } from "@/lib/hooks/use-event-filters";
import { filterEvents, sortEvents } from "@/lib/utils/filter-events";
import { EventFilters } from "@/components/events/event-filters";
import { EventList } from "@/components/events/event-list";
import { EventViewToggle } from "@/components/events/event-view-toggle";
import { EventsMapWrapper } from "@/components/events/events-map-wrapper";
import { formatEventDate } from "@/lib/utils";
import type { EventJSON } from "@/lib/types";
import type { MapEvent } from "@/components/events/events-map";

interface EventsContentProps {
  events: EventJSON[];
  availableCities: string[];
  availableTypes: string[];
  availableTags: string[];
}

function eventsToMapEvents(events: EventJSON[]): MapEvent[] {
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    date: formatEventDate(event.event_date),
    location: event.location,
    coordinates: event.coordinates,
    eventType: event.event_type,
    registrationUrl: event.registration_url,
    capacity: event.capacity ?? undefined,
  }));
}

function EventsContentInner({
  events,
  availableCities,
  availableTypes,
  availableTags,
}: EventsContentProps) {
  const {
    filters,
    toggleCity,
    toggleType,
    toggleTag,
    setPeriod,
    setView,
    resetFilters,
    hasActiveFilters,
  } = useEventFilters();

  const filteredEvents = useMemo(() => {
    const filtered = filterEvents(events, filters);
    return sortEvents(filtered);
  }, [events, filters]);

  const mapEvents = useMemo(
    () => eventsToMapEvents(filteredEvents),
    [filteredEvents]
  );

  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
      {/* Sidebar filters */}
      <aside className="mb-6 lg:mb-0">
        <EventFilters
          filters={filters}
          availableCities={availableCities}
          availableTypes={availableTypes}
          availableTags={availableTags}
          resultCount={filteredEvents.length}
          onToggleCity={toggleCity}
          onToggleType={toggleType}
          onToggleTag={toggleTag}
          onSetPeriod={setPeriod}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </aside>

      {/* Main content */}
      <main>
        {/* View toggle + result count (mobile) */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground lg:hidden">
            {filteredEvents.length} événement
            {filteredEvents.length > 1 ? "s" : ""}
          </p>
          <EventViewToggle view={filters.view} onViewChange={setView} />
        </div>

        {/* Content */}
        {filters.view === "list" ? (
          <EventList
            events={filteredEvents}
            selectedTags={filters.tags}
            onTagClick={toggleTag}
          />
        ) : (
          <EventsMapWrapper events={mapEvents} className="h-[500px]" />
        )}
      </main>
    </div>
  );
}

export function EventsContent(props: EventsContentProps) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-6" />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      }
    >
      <EventsContentInner {...props} />
    </Suspense>
  );
}
