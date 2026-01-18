import { Suspense } from "react";
import type { Metadata } from "next";
import { EventsClient } from "./events-client";
import type { Event } from "@/lib/utils/filter-events";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Événements | GAB Platform",
  description:
    "Découvrez nos meetups, webinars et workshops sur l'IA générative dans toute la France et en ligne.",
};

async function fetchPublishedEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true);

  if (error) {
    console.error("Failed to fetch events", error);
    return [];
  }

  const events = (data ?? []) as Event[];

  return events.map((event) => ({
    ...event,
    city: inferCityFromLocation(event.location),
  }));
}

export default async function EventsPage() {
  const publishedEvents = await fetchPublishedEvents();

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

function inferCityFromLocation(location: string | null): string | null {
  if (!location) return null;
  const normalizedLocation = location.toLowerCase();

  if (normalizedLocation.includes("en ligne")) return "Remote";
  if (normalizedLocation.includes("remote")) return "Remote";
  if (normalizedLocation.includes("online")) return "Remote";
  if (normalizedLocation.includes("lille")) return "Lille";
  if (normalizedLocation.includes("paris")) return "Paris";
  if (normalizedLocation.includes("lyon")) return "Lyon";

  return null;
}
