import { Link } from "react-router-dom";

import {
    Eye,
    Pencil,
    CheckCircle2,
    Trash2,
} from "lucide-react";

import { Badge } from "../ui/Badge";

import {
    formatPrice,
    formatDate,
} from "../../lib/constants";

export function ListingsTable({
    listings,
    onMarkSold,
    onDelete,
}) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="hidden grid-cols-12 gap-3 border-b border-border bg-muted/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
                <div className="col-span-5">
                    Listing
                </div>

                <div className="col-span-2">
                    Price
                </div>

                <div className="col-span-2">
                    Status
                </div>

                <div className="col-span-2">
                    Created
                </div>

                <div className="col-span-1 text-right">
                    Actions
                </div>
            </div>

            <ul className="divide-y divide-border">
                {listings?.map(
                    (listing) => (
                        <li
                            key={
                                listing._id ||
                                listing.id
                            }
                            className="grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-12 md:items-center"
                        >
                            <div className="flex items-center gap-3 md:col-span-5">
                                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                    {listing
                                        .images?.[0] && (
                                            <img
                                                src={
                                                    listing
                                                        .images[0]
                                                }
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                </div>

                                <div className="min-w-0">
                                    <div className="truncate text-sm font-medium">
                                        {
                                            listing.title
                                        }
                                    </div>

                                    <div className="truncate text-xs text-muted-foreground">
                                        {
                                            listing.location
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm md:col-span-2">
                                {formatPrice(
                                    listing.price
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Badge
                                    variant={
                                        listing.status ===
                                            "sold"
                                            ? "muted"
                                            : "success"
                                    }
                                >
                                    {listing.status ===
                                        "sold"
                                        ? "Sold"
                                        : "Available"}
                                </Badge>
                            </div>

                            <div className="text-xs text-muted-foreground md:col-span-2">
                                {formatDate(
                                    listing.createdAt
                                )}
                            </div>

                            <div className="flex justify-start gap-1 md:col-span-1 md:justify-end">
                                <Link
                                    to={`/listings/${listing._id ||
                                        listing.id
                                        }`}
                                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                    <Eye className="h-4 w-4" />
                                </Link>

                                <Link
                                    to={`/edit-listing/${listing._id ||
                                        listing.id
                                        }`}
                                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>

                                {listing.status !==
                                    "sold" && (
                                        <button
                                            onClick={() =>
                                                onMarkSold(
                                                    listing
                                                )
                                            }
                                            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-success"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                        </button>
                                    )}

                                <button
                                    onClick={() =>
                                        onDelete(
                                            listing
                                        )
                                    }
                                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}