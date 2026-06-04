import { ListingCard } from "./ListingCard";

export function ListingGrid({
    listings,
}) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {listings?.map(
                (listing) => (
                    <ListingCard
                        key={
                            listing._id ||
                            listing.id
                        }
                        listing={listing}
                    />
                )
            )}
        </div>
    );
}