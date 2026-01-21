"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/utils";
import { EventTags } from "./event-tags";
import { EventSpeakers } from "./event-speakers";
import { EventProgressBar } from "./event-progress-bar";
import { EventSocialProof } from "./event-social-proof";
import { EventCalendarBtn } from "./event-calendar-btn";
import type { EventJSON } from "@/lib/types";

interface EventCardProps {
  event: EventJSON;
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  meetup: "Meetup",
  workshop: "Workshop",
  webinar: "Webinar",
  conference: "Conférence",
};

export function EventCard({ event, selectedTags, onTagClick }: EventCardProps) {
  const isPast = event.is_past || new Date(event.event_date) < new Date();

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 flex flex-col">
      {event.image_url && (
        <div className="relative aspect-video">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
          />
          {isPast && event.replay_url && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <Play className="h-12 w-12 text-primary" />
            </div>
          )}
        </div>
      )}
      <CardContent className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant={isPast ? "secondary" : "default"}>
            {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
          </Badge>
          {isPast && event.replay_url && (
            <Badge variant="outline">Replay disponible</Badge>
          )}
        </div>

        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Tags */}
        {event.tags.length > 0 && (
          <EventTags
            tags={event.tags}
            selectedTags={selectedTags}
            onTagClick={onTagClick}
            className="mb-3"
          />
        )}

        <div className="space-y-1 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formatEventDate(event.event_date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Speakers */}
        {event.speakers.length > 0 && (
          <div className="mb-3">
            <EventSpeakers speakerIds={event.speakers} compact />
          </div>
        )}

        {/* Progress bar (capacity) */}
        {!isPast && event.capacity && (
          <EventProgressBar
            capacity={event.capacity}
            registeredCount={event.registered_count}
            className="mb-3"
          />
        )}

        {/* Social proof */}
        {!isPast && event.registered_users.length > 0 && (
          <EventSocialProof
            registeredUserIds={event.registered_users}
            registeredCount={event.registered_count}
            className="mb-3"
          />
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {isPast && event.replay_url ? (
          <Button asChild variant="secondary" className="w-full">
            <Link href={event.replay_url} target="_blank">
              <Play className="h-4 w-4 mr-2" />
              Voir le replay
            </Link>
          </Button>
        ) : (
          <>
            {event.registration_url && (
              <Button asChild className="w-full">
                <Link href={event.registration_url} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  S&apos;inscrire
                </Link>
              </Button>
            )}
            {!isPast && event.calendar && (
              <EventCalendarBtn
                calendar={event.calendar}
                eventTitle={event.title}
                className="w-full"
              />
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
