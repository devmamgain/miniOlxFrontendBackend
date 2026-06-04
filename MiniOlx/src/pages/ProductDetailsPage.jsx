import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    MapPin,
    Clock,
    Tag,
    User,
    Pencil,
    CheckCircle2,
    Trash2,
    AlertTriangle,
    ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import { PublicLayout } from "../layouts/PublicLayout";
import { Loader } from "../components/ui/Loader";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { ProductGallery } from "../components/listing/ProductGallery";

import { listingsApi } from "../api/listingsApi";

import {
    formatPrice,
    formatDate,
    categoryLabel,
    conditionLabel,
} from "../lib/constants";

function ProductDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmSold, setConfirmSold] = useState(false);
    const [acting, setActing] = useState(false);

    const loadListing = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await listingsApi.getListingById(id);

            setListing(data);
        } catch (e) {
            setError(e?.message || "Failed to load listing");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadListing();
    }, [id]);

    const handleMarkSold = async () => {
        try {
            setActing(true);

            const updated = await listingsApi.markAsSold(id);

            setListing(updated);

            toast.success("Marked as sold");

            setConfirmSold(false);
        } catch (e) {
            toast.error(e?.message || "Action failed");
        } finally {
            setActing(false);
        }
    };

    const handleDelete = async () => {
        try {
            setActing(true);

            await listingsApi.deleteListing(id);

            toast.success("Listing deleted");

            navigate("/my-listings");
        } catch (e) {
            toast.error(e?.message || "Delete failed");
            setActing(false);
        }
    };

    if (loading) {
        return (
            <PublicLayout>
                <div className="mx-auto max-w-5xl px-4 py-10">
                    <Loader label="Loading listing..." />
                </div>
            </PublicLayout>
        );
    }

    if (error || !listing) {
        return (
            <PublicLayout>
                <div className="mx-auto max-w-2xl px-4 py-10">
                    <EmptyState
                        icon={<AlertTriangle className="h-10 w-10" />}
                        title="Listing unavailable"
                        description={error || "This listing may have been removed"}
                        action={
                            <Link to="/">
                                <Button>Back to marketplace</Button>
                            </Link>
                        }
                    />
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <div className="mx-auto max-w-6xl px-4 py-6">
                <Link
                    to="/"
                    className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to marketplace
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ProductGallery
                        images={listing.images}
                        title={listing.title}
                    />

                    <div className="space-y-5">
                        <div>
                            <div className="flex items-start justify-between gap-3">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    {listing.title}
                                </h1>

                                <Badge
                                    variant={
                                        listing.status === "sold"
                                            ? "muted"
                                            : "success"
                                    }
                                >
                                    {listing.status === "sold"
                                        ? "Sold"
                                        : "Available"}
                                </Badge>
                            </div>

                            <div className="mt-2 text-3xl font-bold text-primary">
                                {formatPrice(listing.price)}
                            </div>

                            {listing.negotiable && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Price is negotiable
                                </p>
                            )}
                        </div>

                        <Card className="grid grid-cols-2 gap-3 p-4 text-sm">
                            <Detail
                                icon={<Tag className="h-4 w-4" />}
                                label="Category"
                                value={categoryLabel(listing.category)}
                            />

                            <Detail
                                icon={<CheckCircle2 className="h-4 w-4" />}
                                label="Condition"
                                value={conditionLabel(listing.condition)}
                            />

                            <Detail
                                icon={<MapPin className="h-4 w-4" />}
                                label="Location"
                                value={listing.location}
                            />

                            <Detail
                                icon={<Clock className="h-4 w-4" />}
                                label="Posted"
                                value={formatDate(listing.createdAt)}
                            />
                        </Card>

                        <div>
                            <h2 className="mb-2 text-sm font-semibold">
                                Description
                            </h2>

                            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                {listing.description}
                            </p>
                        </div>

                        <Card className="p-4">
                            <h2 className="mb-2 text-sm font-semibold">
                                Seller
                            </h2>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                    <User className="h-5 w-5" />
                                </div>

                                <div>
                                    <div className="text-sm font-medium">
                                        {listing.seller?.name}
                                    </div>

                                    {listing.seller?.email && (
                                        <div className="text-xs text-muted-foreground">
                                            {listing.seller.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {listing.isOwner && (
                            <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                                <Link
                                    to={`/edit-listing/${listing._id}`}
                                >
                                    <Button variant="outline">
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>

                                {listing.status !== "sold" && (
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            setConfirmSold(true)
                                        }
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        Mark as sold
                                    </Button>
                                )}

                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        setConfirmDelete(true)
                                    }
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={confirmSold}
                onClose={() => setConfirmSold(false)}
                onConfirm={handleMarkSold}
                title="Mark this listing as sold?"
                description="It will be hidden from the public marketplace but stay in your dashboard."
                confirmLabel="Mark sold"
                variant="success"
                loading={acting}
            />

            <ConfirmDialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title="Delete this listing?"
                description="This will remove the listing from the marketplace."
                confirmLabel="Delete"
                variant="destructive"
                loading={acting}
            />
        </PublicLayout>
    );
}

function Detail({ icon, label, value }) {
    return (
        <div className="flex items-start gap-2">
            <div className="mt-0.5 text-muted-foreground">
                {icon}
            </div>

            <div>
                <div className="text-xs text-muted-foreground">
                    {label}
                </div>

                <div className="text-sm font-medium">
                    {value}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;