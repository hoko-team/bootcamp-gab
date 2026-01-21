import Link from "next/link";
import { ArrowRight, Calendar, BookOpen, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Hero } from "@/components/hero/hero";
import { EventsMapWrapper } from "@/components/events/events-map-wrapper";
import type { MapEvent } from "@/components/events/events-map";

const features = [
  {
    icon: Calendar,
    title: "Events",
    description: "Meetups, webinars et workshops avec des experts GenAI.",
  },
  {
    icon: BookOpen,
    title: "Ressources",
    description: "Guides, skills Claude, templates et prompts actionnables.",
  },
  {
    icon: Zap,
    title: "Formations",
    description: "Parcours structures pour devenir un Builder augmente.",
  },
  {
    icon: Users,
    title: "Communaute",
    description: "Echangez avec des professionnels qui partagent votre vision.",
  },
];

const upcomingEvents: MapEvent[] = [
  {
    id: "1",
    title: "GAB Meetup #4",
    date: "29 janvier 2026 - 19h00",
    location: "Lille, Hauts-de-France",
    coordinates: [50.62925, 3.057256],
    eventType: "Meetup",
    registrationUrl: "/events",
    capacity: 50,
  },
  {
    id: "2",
    title: "Workshop Claude Code",
    date: "15 février 2026 - 14h00",
    location: "Paris, Île-de-France",
    coordinates: [48.8566, 2.3522],
    eventType: "Workshop",
    registrationUrl: "/events",
    capacity: 30,
  },
  {
    id: "3",
    title: "GAB Lyon - Premier Meetup",
    date: "22 février 2026 - 19h00",
    location: "Lyon, Auvergne-Rhône-Alpes",
    coordinates: [45.764043, 4.835659],
    eventType: "Meetup",
    registrationUrl: "/events",
    capacity: 40,
  },
  {
    id: "4",
    title: "Webinar GenAI pour les devs",
    date: "1 mars 2026 - 12h00",
    location: "En ligne",
    coordinates: [46.603354, 1.888334],
    eventType: "Webinar",
    registrationUrl: "/events",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero
        nextEvent={{
          title: "GAB Meetup #4",
          date: "29/01/2026",
          location: "Lille, Hauts-de-France",
          registrationUrl: "/events",
        }}
      />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50">
              <CardContent className="p-6">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Events Map Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl font-bold">Prochains Events</h2>
            <p className="text-muted-foreground mt-1">
              Cliquez sur un marqueur pour voir les details
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/events">
              Voir tous les events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <EventsMapWrapper events={upcomingEvents} />
      </section>

      {/* Resources Preview */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold">
              Ressources populaires
            </h2>
            <Button asChild variant="ghost">
              <Link href="/ressources">
                Voir toutes les ressources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border border-border/50 bg-background p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Guides et ressources en cours de preparation...
            </p>
            <Button asChild className="mt-4">
              <Link href="/ressources">Explorer le catalogue</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Reste informe
          </h2>
          <p className="text-muted-foreground mb-6">
            Recois chaque semaine les dernieres actus GenAI et les ressources de
            la communaute.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
