import { Link } from "react-router-dom";

import {
    MapPin,
    Clock,
} from "lucide-react";

import { Badge } from "../ui/Badge";

import {
    formatPrice,
    formatDate,
    conditionLabel,
} from "../../lib/constants";

export function ListingCard({
    listing,
}) {
    return (
        <Link
            to={`/listings/${listing._id ||
                listing.id
                }`}
            className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
        >
            <div className="relative aspect-square overflow-hidden bg-muted">
                {listing.images?.[0] ? (
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No image
                    </div>
                )}

                {listing.status ===
                    "sold" && (
                        <div className="absolute left-2 top-2">
                            <Badge variant="destructive">
                                SOLD
                            </Badge>
                        </div>
                    )}
            </div>

            <div className="space-y-1.5 p-3">
                <div className="text-lg font-semibold tracking-tight">
                    {formatPrice(
                        listing.price
                    )}
                </div>

                <h3 className="line-clamp-2 text-sm text-foreground">
                    {listing.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="muted">
                        {conditionLabel(
                            listing.condition
                        )}
                    </Badge>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3" />
                        {listing.location}
                    </span>

                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(
                            listing.createdAt
                        )}
                    </span>
                </div>
            </div>
        </Link>
    );
}