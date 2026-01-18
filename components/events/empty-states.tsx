import { Calendar, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface EmptyStateWithResetProps {
  onReset: () => void;
}

export function NoUpcomingEvents({ onReset }: EmptyStateWithResetProps) {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12" />}
      title="Aucun événement"
      description="Aucun événement à venir ne correspond à vos critères."
      action={
        <Button onClick={onReset} variant="outline">
          Réinitialiser les filtres
        </Button>
      }
    />
  );
}

export function NoPastEvents({ onReset }: EmptyStateWithResetProps) {
  return (
    <EmptyState
      icon={<Play className="h-12 w-12" />}
      title="Aucun événement"
      description="Aucun événement passé ne correspond à vos critères."
      action={
        <Button onClick={onReset} variant="outline">
          Réinitialiser les filtres
        </Button>
      }
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
