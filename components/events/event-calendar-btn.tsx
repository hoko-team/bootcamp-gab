"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EventCalendar } from "@/lib/types";

interface EventCalendarBtnProps {
  calendar: EventCalendar;
  eventTitle: string;
  className?: string;
}

export function EventCalendarBtn({
  calendar,
  eventTitle,
  className,
}: EventCalendarBtnProps) {
  const handleGoogleCalendar = () => {
    window.open(calendar.google_url, "_blank");
  };

  const handleICalDownload = () => {
    const blob = new Blob([calendar.ical_data], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventTitle.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Calendar className="w-4 h-4 mr-2" />
          Ajouter au calendrier
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleGoogleCalendar}>
          Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleICalDownload}>
          Apple Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleICalDownload}>
          Outlook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
