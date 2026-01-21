"use client";

import dynamic from "next/dynamic";
import type { MapEvent } from "./events-map";

const EventsMap = dynamic(
  () => import("./events-map").then((mod) => mod.EventsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] bg-muted rounded-lg animate-pulse flex items-center justify-center border border-border">
        <span className="text-muted-foreground">Chargement de la carte...</span>
      </div>
    ),
  }
);

interface EventsMapWrapperProps {
  events: MapEvent[];
  className?: string;
}

export function EventsMapWrapper({ events, className }: EventsMapWrapperProps) {
  return <EventsMap events={events} className={className} />;
}
