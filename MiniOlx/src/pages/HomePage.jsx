import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, PackageOpen, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

import { PublicLayout } from "../layouts/PublicLayout";
import { SearchInput } from "../components/ui/SearchInput";
import { Button } from "../components/ui/Button";
import { ListingGrid } from "../components/listing/ListingGrid";
import { ListingFilters } from "../components/listing/ListingFilters";
import { ListingGridSkeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { Loader } from "../components/ui/Loader";
import { Modal } from "../components/ui/Modal";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { listingsApi } from "../api/listingsApi";

export default function Home() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = useMemo(
        () => ({
            search: searchParams.get("search") || "",
            category: searchParams.get("category") || undefined,
            condition: searchParams.get("condition") || undefined,
            minPrice: searchParams.get("minPrice")
                ? Number(searchParams.get("minPrice"))
                : undefined,
            maxPrice: searchParams.get("maxPrice")
                ? Number(searchParams.get("maxPrice"))
                : undefined,
            location: searchParams.get("location") || undefined,
            availability: searchParams.get("availability") || "available",
        }),
        [searchParams]
    );

    const [searchInput, setSearchInput] = useState(search.search);
    const debouncedSearch = useDebounce(searchInput, 400);
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        setSearchParams(params);
    }, [debouncedSearch]);

    const filterValues = useMemo(
        () => ({
            category: search.category,
            condition: search.condition,
            minPrice: search.minPrice,
            maxPrice: search.maxPrice,
            location: search.location,
            availability: search.availability,
        }),
        [search]
    );

    const setFilters = useCallback(
        (values) => {
            const params = new URLSearchParams(searchParams);

            Object.entries(values).forEach(([key, value]) => {
                if (value === undefined || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });

            setSearchParams(params);
        },
        [searchParams]
    );

    const clearFilters = useCallback(() => {
        const params = new URLSearchParams();

        if (search.search) {
            params.set("search", search.search);
        }

        params.set("availability", "available");

        setSearchParams(params);
    }, [search.search]);

    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const abortRef = useRef(null);

    const query = useMemo(
        () => ({
            search: debouncedSearch || undefined,
            category: search.category,
            condition: search.condition,
            minPrice: search.minPrice,
            maxPrice: search.maxPrice,
            location: search.location,
            availability: search.availability,
            limit: 8,
        }),
        [debouncedSearch, search]
    );

    useEffect(() => {
        console.log("QUERY CHANGED");

        setListings([]);
        setPage(1);
        setHasMore(true);
        setError(null);
    }, [query]);

    useEffect(() => {
        console.log("FETCH", page);

        if (!hasMore && page > 1) return;

        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);

        listingsApi
            .getListings({ ...query, page }, controller.signal)
            .then((res) => {
                setListings((prev) =>
                    page === 1 ? res.data : [...prev, ...res.data]
                );
                setHasMore(res.hasMore);
            })
            .catch((err) => {
                if (controller.signal.aborted) return;
                setError(err?.message || "Failed to load listings");
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [query, page]);

    const sentinelRef = useInfiniteScroll({
        hasMore,
        isLoading: loading,
        onLoadMore: () => setPage((p) => p + 1),
    });

    const retry = () => {
        toast.dismiss();
        setListings([]);
        setPage(1);
        setHasMore(true);
        setError(null);
    };

    const filtersPanel = (
        <ListingFilters
            values={filterValues}
            onChange={setFilters}
            onClear={clearFilters}
        />
    );

    return (
        <PublicLayout>
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <SearchInput value={searchInput} onChange={setSearchInput} className="flex-1" />
                    <Button variant="outline" onClick={() => setFiltersOpen(true)} className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4" /> Filters
                    </Button>
                </div>

                <div className="flex gap-6">
                    <aside className="hidden w-64 flex-shrink-0 lg:block">
                        <div className="sticky top-20 rounded-xl border border-border bg-card p-4">
                            {filtersPanel}
                        </div>
                    </aside>

                    <section className="min-w-0 flex-1">
                        {error ? (
                            <EmptyState
                                icon={<AlertTriangle className="h-10 w-10" />}
                                title="Couldn't load listings"
                                description={error}
                                action={<Button onClick={retry}>Try again</Button>}
                            />
                        ) : loading && listings?.length === 0 ? (
                            <ListingGridSkeleton />
                        ) : listings?.length === 0 ? (
                            <EmptyState
                                icon={<PackageOpen className="h-10 w-10" />}
                                title="No listings found"
                                description="Try adjusting your search or filters."
                                action={<Button variant="outline" onClick={clearFilters}>Clear filters</Button>}
                            />
                        ) : (
                            <>
                                <ListingGrid listings={listings} />
                                <div ref={sentinelRef} className="h-10" />
                                {loading && listings?.length > 0 && <Loader />}
                                {!hasMore && listings?.length > 0 && (
                                    <p className="py-6 text-center text-sm text-muted-foreground">You've reached the end</p>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>

            <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
                {filtersPanel}
            </Modal>
        </PublicLayout>
    );
}