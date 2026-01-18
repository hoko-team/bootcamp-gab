import { Calendar, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-muted-foreground">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        {description}
      </p>
      {action}
    </div>
  );
}

export function NoUpcomingEvents() {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12" />}
      title="Aucun événement prévu pour le moment"
      description="Inscrivez-vous à la newsletter pour être notifié des prochains événements de la communauté GAB."
      action={
        <Button asChild>
          <Link href="/#newsletter">Recevoir les annonces</Link>
        </Button>
      }
    />
  );
}

export function NoReplays() {
  return (
    <EmptyState
      icon={<Play className="h-12 w-12" />}
      title="Aucun replay disponible actuellement"
      description="Les replays des événements passés seront publiés ici prochainement. Revenez bientôt pour découvrir nos précédentes sessions."
    />
  );
}

interface NoFilterResultsProps {
  onReset: () => void;
}

export function NoFilterResults({ onReset }: NoFilterResultsProps) {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12" />}
      title="Aucun événement ne correspond à vos critères"
      description="Essayez de modifier vos filtres pour afficher plus de résultats."
      action={
        <Button onClick={onReset} variant="outline">
          Réinitialiser les filtres
        </Button>
      }
    />
  );
}
