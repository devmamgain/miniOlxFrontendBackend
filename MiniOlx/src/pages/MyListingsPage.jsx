import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, PackageOpen, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { ListingsTable } from "../components/dashboard/ListingsTable";
import { Button } from "../components/ui/Button";
import { TableSkeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { listingsApi } from "../api/listingsApi";

export default function MyListingsPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [soldTarget, setSoldTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [acting, setActing] = useState(false);

    const load = () => {
        setLoading(true);
        setError(null);

        listingsApi
            .getMyListings()
            .then(setListings)
            .catch((e) => setError(e?.message || "Failed to load"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
    }, []);

    const handleMarkSold = async () => {
        if (!soldTarget) return;

        setActing(true);

        try {
            const updated = await listingsApi.markAsSold(soldTarget._id);

            setListings((prev) =>
                prev.map((listing) =>
                    listing._id === updated._id ? updated : listing
                )
            );

            toast.success("Marked as sold");
            setSoldTarget(null);
        } catch (e) {
            toast.error(e?.message || "Action failed");
        } finally {
            setActing(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        setActing(true);

        try {
            await listingsApi.deleteListing(deleteTarget._id);

            setListings((prev) =>
                prev.filter((listing) => listing._id !== deleteTarget._id)
            );

            toast.success("Listing deleted");
            setDeleteTarget(null);
        } catch (e) {
            toast.error(e?.message || "Delete failed");
        } finally {
            setActing(false);
        }
    };

    return (
        <ProtectedRoute>
            <DashboardLayout
                title="My Listings"
                action={
                    <Link to="/create-listing">
                        <Button>
                            <Plus className="h-4 w-4" />
                            New listing
                        </Button>
                    </Link>
                }
            >
                {loading ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <TableSkeleton rows={1} />
                            <TableSkeleton rows={1} />
                            <TableSkeleton rows={1} />
                        </div>

                        <TableSkeleton rows={5} />
                    </div>
                ) : error ? (
                    <EmptyState
                        icon={<AlertTriangle className="h-10 w-10" />}
                        title="Couldn't load your listings"
                        description={error}
                        action={<Button onClick={load}>Retry</Button>}
                    />
                ) : listings?.length === 0 ? (
                    <EmptyState
                        icon={<PackageOpen className="h-10 w-10" />}
                        title="No listings yet"
                        description="Create your first listing to start selling."
                        action={
                            <Link to="/create-listing">
                                <Button>
                                    <Plus className="h-4 w-4" />
                                    Create listing
                                </Button>
                            </Link>
                        }
                    />
                ) : (
                    <div className="space-y-6">
                        <DashboardStats listings={listings} />

                        <ListingsTable
                            listings={listings}
                            onMarkSold={setSoldTarget}
                            onDelete={setDeleteTarget}
                        />
                    </div>
                )}

                <ConfirmDialog
                    open={!!soldTarget}
                    onClose={() => setSoldTarget(null)}
                    onConfirm={handleMarkSold}
                    title="Mark as sold?"
                    description={`"${soldTarget?.title || ""
                        }" will be hidden from the public feed.`}
                    confirmLabel="Mark sold"
                    variant="success"
                    loading={acting}
                />

                <ConfirmDialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={handleDelete}
                    title="Delete listing?"
                    description={`This will remove "${deleteTarget?.title || ""
                        }" from the marketplace.`}
                    confirmLabel="Delete"
                    variant="destructive"
                    loading={acting}
                />
            </DashboardLayout>
        </ProtectedRoute>
    );
}