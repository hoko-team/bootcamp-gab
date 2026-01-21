import type { EventJSON, EventFilters } from "@/lib/types";

export function filterEvents(
  events: EventJSON[],
  filters: EventFilters
): EventJSON[] {
  return events.filter((event) => {
    // Filter by cities
    if (filters.cities.length > 0) {
      const eventCity = event.location.split(",")[0].trim().toLowerCase();
      const matchesCity = filters.cities.some(
        (city) => city.toLowerCase() === eventCity
      );
      if (!matchesCity) return false;
    }

    // Filter by event types
    if (filters.types.length > 0) {
      const matchesType = filters.types.some(
        (type) => type.toLowerCase() === event.event_type.toLowerCase()
      );
      if (!matchesType) return false;
    }

    // Filter by period
    if (filters.period === "upcoming" && event.is_past) return false;
    if (filters.period === "past" && !event.is_past) return false;

    // Filter by tags
    if (filters.tags.length > 0) {
      const eventTags = event.tags.map((tag) =>
        tag.startsWith("#") ? tag.slice(1).toLowerCase() : tag.toLowerCase()
      );
      const matchesTags = filters.tags.some((filterTag) =>
        eventTags.some((eventTag) =>
          eventTag.includes(filterTag.toLowerCase())
        )
      );
      if (!matchesTags) return false;
    }

    return true;
  });
}

export function sortEvents(events: EventJSON[]): EventJSON[] {
  return [...events].sort((a, b) => {
    // Upcoming events first, sorted by date ascending
    // Past events after, sorted by date descending
    if (!a.is_past && !b.is_past) {
      return (
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );
    }
    if (a.is_past && b.is_past) {
      return (
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
      );
    }
    return a.is_past ? 1 : -1;
  });
}
