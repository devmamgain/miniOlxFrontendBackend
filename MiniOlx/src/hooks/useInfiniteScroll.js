import { useEffect, useRef } from "react";

export function useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore,
    rootMargin = "0px",
}) {
    const sentinelRef = useRef(null);
    const lockRef = useRef(false);

    useEffect(() => {
        const element = sentinelRef.current;
        if (!element || !hasMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !isLoading &&
                    hasMore &&
                    !lockRef.current
                ) {
                    lockRef.current = true;
                    onLoadMore();

                    setTimeout(() => {
                        lockRef.current = false;
                    }, 300);
                }
            },
            {
                rootMargin,
                threshold: 0.1,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [hasMore, isLoading, onLoadMore, rootMargin]);

    return sentinelRef;
}