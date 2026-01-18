import { Suspense } from "react";
import type { Metadata } from "next";
import { EventsClient } from "./events-client";
import eventsData from "@/data/events.json";
import type { Event } from "@/lib/utils/filter-events";

export const metadata: Metadata = {
  title: "Événements | GAB Platform",
  description:
    "Découvrez nos meetups, webinars et workshops sur l'IA générative dans toute la France et en ligne.",
};

export default function EventsPage() {
  // Load events from JSON
  // Note: JSON events don't have created_at/updated_at from Supabase
  const allEvents = eventsData as unknown as Event[];

  // Filter only published events
  const publishedEvents = allEvents.filter((e) => e.published);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero section */}
      <section className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Événements GAB</h1>
        <p className="text-xl text-muted-foreground">
          Découvrez nos meetups, webinars et workshops dans toute la France et
          en ligne
        </p>
      </section>

      {/* Events with filters */}
      <Suspense fallback={<div className="text-center py-12">Chargement...</div>}>
        <EventsClient initialEvents={publishedEvents} />
      </Suspense>
    </div>
  );
}
