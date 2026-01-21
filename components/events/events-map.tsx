"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marqueur vert personnalisé en SVG
const greenIcon = new L.DivIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path fill="#22c55e" stroke="#15803d" stroke-width="1" d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z"/>
    <circle fill="white" cx="12" cy="12" r="5"/>
  </svg>`,
  className: "custom-marker",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

export interface MapEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  eventType: string;
  registrationUrl?: string;
  capacity?: number;
}

interface EventsMapProps {
  events: MapEvent[];
  className?: string;
}

function MapController({ events }: { events: MapEvent[] }) {
  const map = useMap();

  useEffect(() => {
    if (events.length > 0) {
      const bounds = L.latLngBounds(events.map((e) => e.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [events, map]);

  return null;
}

export function EventsMap({ events, className }: EventsMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Éviter le rendu côté serveur
  if (!mounted) {
    return (
      <div className={`bg-muted rounded-lg animate-pulse ${className}`} style={{ height: "400px" }}>
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Chargement de la carte...
        </div>
      </div>
    );
  }

  // Centre par défaut sur la France
  const defaultCenter: [number, number] = [46.603354, 1.888334];

  return (
    <div className={`rounded-lg overflow-hidden border border-border ${className}`}>
      <MapContainer
        center={events.length > 0 ? events[0].coordinates : defaultCenter}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        />
        {events.length > 1 && <MapController events={events} />}
        {events.map((event) => (
          <Marker key={event.id} position={event.coordinates} icon={greenIcon}>
            <Popup>
              <div className="min-w-[200px] p-1">
                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                  {event.eventType}
                </span>
                <h3 className="font-semibold text-sm mb-2">{event.title}</h3>
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  {event.capacity && (
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3 w-3" />
                      <span>{event.capacity} places</span>
                    </div>
                  )}
                </div>
                {event.registrationUrl && (
                  <Button asChild size="sm" className="w-full h-7 text-xs">
                    <Link href={event.registrationUrl}>S&apos;inscrire</Link>
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
