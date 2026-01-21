"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getUsersByIds } from "@/lib/data/users";

interface EventSocialProofProps {
  registeredUserIds: string[];
  registeredCount: number;
  maxAvatars?: number;
  className?: string;
}

export function EventSocialProof({
  registeredUserIds,
  registeredCount,
  maxAvatars = 3,
  className,
}: EventSocialProofProps) {
  if (registeredCount === 0) return null;

  const users = getUsersByIds(registeredUserIds.slice(0, maxAvatars));
  const remainingCount = registeredCount - maxAvatars;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        {users.map((user) => (
          <Avatar key={user.id} className="w-6 h-6 border-2 border-background">
            <AvatarImage src={user.avatar_url} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="text-xs text-muted-foreground">
          +{remainingCount} inscrits
        </span>
      )}
    </div>
  );
}
