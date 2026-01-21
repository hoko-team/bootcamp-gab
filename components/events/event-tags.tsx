"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventTagsProps {
  tags: string[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function EventTags({
  tags,
  selectedTags = [],
  onTagClick,
  className,
}: EventTagsProps) {
  if (tags.length === 0) return null;

  const isSelected = (tag: string) => {
    const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
    return selectedTags.some(
      (selected) => selected.toLowerCase() === cleanTag.toLowerCase()
    );
  };

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={isSelected(tag) ? "default" : "secondary"}
          className={cn(
            "text-xs cursor-pointer transition-colors",
            onTagClick && "hover:bg-primary/20"
          )}
          onClick={() => onTagClick?.(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
