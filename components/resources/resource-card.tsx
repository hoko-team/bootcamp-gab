import Link from "next/link";
import { FileText, Code, Layout, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/lib/types/content";

const typeIcons = {
  guide: FileText,
  skill: Code,
  template: Layout,
  prompt: MessageSquare,
};

const typeLabels = {
  guide: "Guide",
  skill: "Skill Claude",
  template: "Template",
  prompt: "Prompt",
};

const difficultyLabels = {
  beginner: "Debutant",
  intermediate: "Intermediaire",
  advanced: "Avance",
};

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = typeIcons[resource.type] || FileText;

  return (
    <Link href={`/ressources/${resource.slug}`}>
      <Card className="overflow-hidden transition-all hover:border-primary/50 h-full">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            {resource.difficulty && (
              <Badge
                variant="outline"
                className={difficultyColors[resource.difficulty]}
              >
                {difficultyLabels[resource.difficulty]}
              </Badge>
            )}
          </div>
          <Badge variant="secondary" className="mb-2">
            {typeLabels[resource.type]}
          </Badge>
          <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
            {resource.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {resource.parcours?.map((p) => (
              <Badge key={p} variant="outline" className="text-xs">
                {p}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
