import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedStripes } from "./animated-stripes";

interface HeroProps {
  nextEvent?: {
    title: string;
    date: string;
    location?: string;
    registrationUrl: string;
  };
}

export function Hero({ nextEvent }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] h-auto overflow-hidden flex items-center">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-bg.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* Effet de stripes animées au-dessus de l'image */}
      <AnimatedStripes />

      <div className="container mx-auto px-4 py-16 relative z-10 lg:pl-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche: Texte GAB */}
          <div className="text-center md:text-left">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Deviens un <span className="text-primary">Builder Augmenté</span>
            </h1>
            <p className="text-xl text-white/90 max-w-xl mb-8 drop-shadow-md">
              Pour celles et ceux qui construisent vraiment avec la GenAI.
              Rejoins la communauté française des professionnels qui maîtrisent
              la programmation assistée par IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/events">
                  Prochain Event
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <Link href="/formations">Découvrir les formations</Link>
              </Button>
            </div>
          </div>

          {/* Colonne droite: Event Card */}
          {nextEvent && (
            <div className="relative max-w-lg mx-auto md:mx-0 lg:pl-20">
              <Card className="overflow-hidden border-white/20 bg-black/60 backdrop-blur-md">
                <div className="relative aspect-square">
                  <Image
                    src="/images/thumbnail_gab4.webp"
                    alt={nextEvent.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{nextEvent.date}</span>
                  </div>
                  {nextEvent.location && (
                    <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{nextEvent.location}</span>
                    </div>
                  )}
                  <h3 className="font-heading text-lg font-semibold mb-3 text-white">
                    {nextEvent.title}
                  </h3>
                  <Button asChild className="w-full">
                    <Link href={nextEvent.registrationUrl}>
                      S&apos;inscrire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
