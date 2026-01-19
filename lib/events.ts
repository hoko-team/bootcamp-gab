import { Event } from "@/lib/types/content";
import eventsData from "@/data/events.json";
import { formatDateShort } from "./utils";

export function getEvents(): Event[] {
  return eventsData as Event[];
}

export function getNextEvent(): Event | null {
  const now = new Date();
  const events = getEvents()
    .filter((event) => event.published && !event.is_past)
    .sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      return dateA.getTime() - dateB.getTime();
    });

  return events.length > 0 ? events[0] : null;
}

export function formatEventForHero(event: Event | null) {
  if (!event) return undefined;

  return {
    title: event.title,
    date: formatDateShort(event.event_date),
    location: event.location || undefined,
    registrationUrl: event.registration_url || "/events",
  };
}
