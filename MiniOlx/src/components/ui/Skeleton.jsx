import { cn } from "../../lib/utils";

export function Skeleton({ className }) {
    return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function ListingCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}

export function ListingGridSkeleton({ count = 8 }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => <ListingCardSkeleton key={i} />)}
        </div>
    );
}

export function TableSkeleton({ rows = 5 }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
        </div>
    );
}