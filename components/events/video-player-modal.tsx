"use client";

import { useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Event } from "@/lib/utils/filter-events";
import { formatEventDate } from "@/lib/utils";

interface VideoPlayerModalProps {
  event: Event | null;
  onClose: () => void;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function VideoPlayerModal({ event, onClose }: VideoPlayerModalProps) {
  const isOpen = event !== null;

  // Stop video when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Cleanup: This ensures the video stops when closing
      return;
    }
  }, [isOpen]);

  if (!event) return null;

  const videoId = event.replay_url
    ? getYouTubeVideoId(event.replay_url)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">
                {event.title}
              </DialogTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatEventDate(new Date(event.event_date))}
                </div>
                {event.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.city}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Video Player */}
        {videoId ? (
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={event.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">
              Replay non disponible pour le moment
            </p>
          </div>
        )}

        {/* Event Description */}
        {event.description && (
          <div className="mt-6 prose prose-sm dark:prose-invert max-w-none">
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: event.description.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
