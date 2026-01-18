import type { Database } from "@/lib/supabase/types";

// Extend the Supabase Event type to include the city field (for Phase 1 - JSON)
// In Phase 2, this will come from the Supabase schema
export type Event = Database["public"]["Tables"]["events"]["Row"] & {
  city?: string | null;
};

export type EventType = "meetup" | "webinar" | "workshop" | "conference";
export type PeriodFilter = "all" | "upcoming" | "past";
export type CityFilter = "Lille" | "Paris" | "Lyon" | "Remote";

export interface FilterParams {
  cities: string[];
  type: EventType | "all";
  period: PeriodFilter;
}

export interface FilterCounts {
  byCity: Record<string, number>;
  byType: Record<string, number>;
  byPeriod: {
    all: number;
    upcoming: number;
    past: number;
  };
}

function isPastEvent(event: Event): boolean {
  if (event.is_past !== null) return event.is_past;
  return new Date(event.event_date) < new Date();
}

/**
 * Filter events by city (multi-selection with AND logic)
 */
export function filterByCity(events: Event[], cities: string[]): Event[] {
  if (cities.length === 0) return events;
  return events.filter((event) => cities.includes(event.city || ""));
}

/**
 * Filter events by type (single-selection)
 */
export function filterByType(
  events: Event[],
  type: EventType | "all"
): Event[] {
  if (type === "all") return events;
  return events.filter((event) => event.event_type === type);
}

/**
 * Filter events by period (single-selection)
 */
export function filterByPeriod(
  events: Event[],
  period: PeriodFilter
): Event[] {
  switch (period) {
    case "upcoming":
      return events.filter((event) => !isPastEvent(event));
    case "past":
      return events.filter((event) => isPastEvent(event));
    default:
      return events;
  }
}

/**
 * Apply all filters (priority: period → city → type)
 */
export function applyFilters(
  events: Event[],
  filters: FilterParams
): Event[] {
  let filtered = events;
  filtered = filterByPeriod(filtered, filters.period);
  filtered = filterByCity(filtered, filters.cities);
  filtered = filterByType(filtered, filters.type);
  return filtered;
}

/**
 * Sort events: upcoming ascending, past descending
 */
export function sortEvents(events: Event[]): Event[] {
  const upcoming = events
    .filter((event) => !isPastEvent(event))
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );

  const past = events
    .filter((event) => isPastEvent(event))
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );

  return [...upcoming, ...past];
}

/**
 * Calculate dynamic counters for filter UI
 */
export function calculateFilterCounts(events: Event[]): FilterCounts {
  return {
    byCity: events.reduce((acc, event) => {
      const city = event.city || "Unknown";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),

    byType: events.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),

    byPeriod: {
      all: events.length,
      upcoming: events.filter((event) => !isPastEvent(event)).length,
      past: events.filter((event) => isPastEvent(event)).length,
    },
  };
}

/**
 * Separate events into upcoming and past
 */
export function separateEvents(events: Event[]): {
  upcoming: Event[];
  past: Event[];
} {
  const upcoming = events.filter((event) => !isPastEvent(event));
  const past = events.filter((event) => isPastEvent(event));

  return { upcoming, past };
}
