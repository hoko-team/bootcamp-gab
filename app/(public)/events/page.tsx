import type { Metadata } from "next";
import {
  getPublishedEvents,
  getUniqueCities,
  getUniqueTags,
  getUniqueEventTypes,
} from "@/lib/data/events";
import { EventsContent } from "./events-content";

export const metadata: Metadata = {
  title: "Events | GAB - GenAI Builders",
  description:
    "Meetups, webinars et workshops GenAI. Rejoins la communauté GAB pour apprendre et partager autour de l'IA générative.",
  openGraph: {
    title: "Events | GAB - GenAI Builders",
    description:
      "Meetups, webinars et workshops GenAI. Rejoins la communauté GAB.",
    type: "website",
  },
};

export default function EventsPage() {
  const events = getPublishedEvents();
  const availableCities = getUniqueCities();
  const availableTypes = getUniqueEventTypes();
  const availableTags = getUniqueTags();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="font-heading text-3xl font-bold mb-4">Events</h1>
        <p className="text-lg text-muted-foreground">
          Meetups, webinars et workshops avec des experts GenAI. Participe en
          direct ou regarde les replays.
        </p>
      </div>

      <EventsContent
        events={events}
        availableCities={availableCities}
        availableTypes={availableTypes}
        availableTags={availableTags}
      />
    </div>
  );
}
