export interface EventAgendaItem {
  time: string;
  title: string;
  description?: string;
  duration_minutes: number;
  speaker_ids?: string[];
}

export interface EventResource {
  title: string;
  url: string;
  type: "slides" | "code" | "video" | "document";
}

export interface EventCalendar {
  google_url: string;
  ical_data: string;
}

export interface EventJSON {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  event_date: string;
  event_end_date: string;
  location: string;
  address: string | null;
  coordinates: [number, number];
  image_url: string;
  registration_url: string;
  replay_url: string | null;
  is_past: boolean;
  event_type: "meetup" | "webinar" | "workshop" | "conference";
  capacity: number | null;
  registered_count: number;
  published: boolean;
  speakers: string[];
  tags: string[];
  registered_users: string[];
  agenda: EventAgendaItem[];
  resources: EventResource[];
  gallery_urls: string[];
  calendar: EventCalendar;
}

export type EventView = "list" | "map";

export type EventPeriod = "all" | "upcoming" | "past";

export interface EventFilters {
  cities: string[];
  types: string[];
  period: EventPeriod;
  tags: string[];
  view: EventView;
}
