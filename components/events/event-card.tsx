import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate, cn } from "@/lib/utils";
import type { Event } from "@/lib/utils/filter-events";

interface EventCardProps {
  event: Event;
  onReplayClick?: () => void;
}

const CITY_COLORS: Record<string, string> = {
  Lille: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Paris: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Lyon: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Remote: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
};

export function EventCard({ event, onReplayClick }: EventCardProps) {
  const isPast = event.is_past || new Date(event.event_date) < new Date();
  const cityColor = CITY_COLORS[event.city || ""] || CITY_COLORS.default;

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg group">
      {/* Image or Fallback */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-primary/20">GAB</div>
          </div>
        )}
        {isPast && event.replay_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-12 w-12 text-primary" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant={isPast ? "secondary" : "default"}>
            {event.event_type}
          </Badge>
          {event.city && (
            <Badge variant="outline" className={cn("border-0", cityColor)}>
              {event.city}
            </Badge>
          )}
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
          onReplayClick ? (
            <Button
              onClick={onReplayClick}
              variant="secondary"
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Voir le replay
            </Button>
          ) : (
            <Button asChild variant="secondary" className="w-full">
              <Link href={event.replay_url} target="_blank">
                <Play className="h-4 w-4 mr-2" />
                Voir le replay
              </Link>
            </Button>
          )
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
