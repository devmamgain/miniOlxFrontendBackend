import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";
import { Card } from "../components/ui/Card";
import { Loader } from "../components/ui/Loader";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import { ListingWizard } from "../components/listing/ListingWizard";
import { listingsApi } from "../api/listingsApi";

function EditListingPage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);

                const data = await listingsApi.getListingById(id);

                setListing(data);
            } catch (e) {
                setError(e?.message || "Failed to load listing");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchListing();
        }
    }, [id]);

    return (
        <ProtectedRoute>
            <DashboardLayout title="Edit Listing">
                {loading ? (
                    <Loader label="Loading listing..." />
                ) : error || !listing ? (
                    <EmptyState
                        title="Couldn't load listing"
                        description={error || "Listing not found"}
                        action={
                            <Button onClick={() => navigate("/my-listings")}>
                                Back to my listings
                            </Button>
                        }
                    />
                ) : (
                    <Card className="p-5">
                        <ListingWizard
                            submitLabel="Save Changes"
                            defaultValues={{
                                title: listing.title,
                                description: listing.description,
                                category: listing.category,
                                price: listing.price,
                                negotiable: listing.negotiable,
                                condition: listing.condition,
                                location: listing.location,
                                images: listing.images,
                            }}
                            onSubmit={async (values) => {
                                try {
                                    await listingsApi.updateListing(id, values);

                                    toast.success("Listing updated");

                                    navigate(`/listings/${id}`);
                                } catch (e) {
                                    toast.error(e?.message || "Update failed");
                                }
                            }}
                        />
                    </Card>
                )}
            </DashboardLayout>
        </ProtectedRoute>
    );
}

export default EditListingPage;