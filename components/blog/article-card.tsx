import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types/content";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="overflow-hidden transition-all hover:border-primary/50 h-full">
        {article.featured_image && (
          <div className="relative aspect-video">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {article.category && (
              <Badge variant="secondary">{article.category}</Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {article.published_at && formatDate(article.published_at)}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
