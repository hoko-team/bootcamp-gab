import eventsData from "@/data/events.json";
import type { EventJSON } from "@/lib/types";

export function getEvents(): EventJSON[] {
  return eventsData as EventJSON[];
}

export function getPublishedEvents(): EventJSON[] {
  return getEvents().filter((event) => event.published);
}

export function getEventBySlug(slug: string): EventJSON | undefined {
  return getEvents().find((event) => event.slug === slug);
}

export function getUpcomingEvents(): EventJSON[] {
  return getPublishedEvents()
    .filter((event) => !event.is_past)
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );
}

export function getPastEvents(): EventJSON[] {
  return getPublishedEvents()
    .filter((event) => event.is_past)
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
}

export function getUniqueCities(): string[] {
  const cities = getPublishedEvents().map((event) => {
    const city = event.location.split(",")[0].trim();
    return city;
  });
  return [...new Set(cities)].sort();
}

export function getUniqueTags(): string[] {
  const tags = getPublishedEvents().flatMap((event) => event.tags);
  return [...new Set(tags)].sort();
}

export function getUniqueEventTypes(): string[] {
  const types = getPublishedEvents().map((event) => event.event_type);
  return [...new Set(types)].sort();
}
