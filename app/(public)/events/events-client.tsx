"use client";

import { useState } from "react";
import { EventFilters } from "@/components/events/event-filters";
import { EventFiltersMobile } from "@/components/events/event-filters-mobile";
import { EventCard } from "@/components/events/event-card";
import { VideoPlayerModal } from "@/components/events/video-player-modal";
import {
  NoUpcomingEvents,
  NoPastEvents,
  NoFilterResults,
} from "@/components/events/empty-states";
import { useEventFilters } from "@/hooks/use-event-filters";
import {
  applyFilters,
  sortEvents,
  separateEvents,
  type Event,
} from "@/lib/utils/filter-events";

interface EventsClientProps {
  initialEvents: Event[];
}

export function EventsClient({ initialEvents }: EventsClientProps) {
  const {
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useEventFilters();
  const [videoModalEvent, setVideoModalEvent] = useState<Event | null>(null);

  // Apply filters and sorting
  const filteredEvents = applyFilters(initialEvents, filters);
  const sortedEvents = sortEvents(filteredEvents);
  const { upcoming, past } = separateEvents(sortedEvents);

  // Determine if we should show "no results" empty state
  const showNoResults =
    filteredEvents.length === 0 && initialEvents.length > 0 && hasActiveFilters;

  return (
    <>
      <div className="flex gap-8">
        {/* Desktop filters sidebar */}
        <aside className="hidden lg:block w-[280px] sticky top-24 self-start">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Filtres</h2>
            <EventFilters
              events={initialEvents}
              filters={filters}
              onFilterChange={setFilters}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {showNoResults ? (
            <NoFilterResults onReset={resetFilters} />
          ) : (
            <>
              {/* Upcoming Events Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  Événements à venir ({upcoming.length})
                </h2>
                {upcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <NoUpcomingEvents onReset={resetFilters} />
                )}
              </section>

              {/* Past Events Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6">
                  Événements passés ({past.length})
                </h2>
                {past.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {past.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onReplayClick={() => setVideoModalEvent(event)}
                      />
                    ))}
                  </div>
                ) : (
                  <NoPastEvents onReset={resetFilters} />
                )}
              </section>
            </>
          )}
        </main>
      </div>

      {/* Mobile filters button */}
      <EventFiltersMobile
        events={initialEvents}
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Video modal */}
      <VideoPlayerModal
        event={videoModalEvent}
        onClose={() => setVideoModalEvent(null)}
      />
    </>
  );
}
