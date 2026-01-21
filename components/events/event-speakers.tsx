"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getSpeakersForEvent } from "@/lib/data/users";

interface EventSpeakersProps {
  speakerIds: string[];
  compact?: boolean;
  className?: string;
}

export function EventSpeakers({
  speakerIds,
  compact = false,
  className,
}: EventSpeakersProps) {
  const speakers = getSpeakersForEvent(speakerIds);

  if (speakers.length === 0) return null;

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex -space-x-2">
          {speakers.map((speaker) => (
            <Avatar
              key={speaker.id}
              className="w-6 h-6 border-2 border-background"
            >
              <AvatarImage src={speaker.avatar_url} alt={speaker.name} />
              <AvatarFallback className="text-xs">
                {speaker.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {speakers.length} speaker{speakers.length > 1 ? "s" : ""}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {speakers.map((speaker) => (
        <div key={speaker.id} className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={speaker.avatar_url} alt={speaker.name} />
            <AvatarFallback className="text-xs">
              {speaker.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{speaker.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {speaker.role} @ {speaker.company}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
