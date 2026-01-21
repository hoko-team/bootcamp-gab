"use client";

import { cn } from "@/lib/utils";

interface EventProgressBarProps {
  capacity: number | null;
  registeredCount: number;
  className?: string;
}

export function EventProgressBar({
  capacity,
  registeredCount,
  className,
}: EventProgressBarProps) {
  if (!capacity) return null;

  const fillPercentage = Math.min((registeredCount / capacity) * 100, 100);

  const getColorClass = () => {
    if (fillPercentage < 50) return "bg-green-500";
    if (fillPercentage < 80) return "bg-yellow-500";
    if (fillPercentage < 95) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className={cn("space-y-1", className)}>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all", getColorClass())}
          style={{ width: `${fillPercentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {registeredCount}/{capacity} places
        {fillPercentage >= 80 && " • Dernières places !"}
      </p>
    </div>
  );
}
