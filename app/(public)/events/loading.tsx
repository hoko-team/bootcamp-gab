import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header skeleton */}
      <div className="max-w-3xl mb-12">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-6 w-full max-w-lg" />
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Sidebar filters skeleton */}
        <aside className="mb-6 lg:mb-0">
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-16 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-16 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <div>
              <Skeleton className="h-6 w-16 mb-3" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-18" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main content skeleton */}
        <main>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-5 w-32 lg:hidden" />
            <Skeleton className="h-9 w-20" />
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border overflow-hidden">
                <Skeleton className="aspect-video" />
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
