import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/utils";
import type { Event } from "@/lib/types/content";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isPast = event.is_past || new Date(event.event_date) < new Date();

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50">
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
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={isPast ? "secondary" : "default"}>
            {event.event_type}
          </Badge>
          {isPast && event.replay_url && (
            <Badge variant="outline">Replay disponible</Badge>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatEventDate(event.event_date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isPast && event.replay_url ? (
          <Button asChild variant="secondary" className="w-full">
            <Link href={event.replay_url} target="_blank">
              <Play className="h-4 w-4 mr-2" />
              Voir le replay
            </Link>
          </Button>
        ) : event.registration_url ? (
          <Button asChild className="w-full">
            <Link href={event.registration_url} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              S&apos;inscrire
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
