import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";
import { Card } from "../components/ui/Card";
import { ListingWizard } from "../components/listing/ListingWizard";
import { listingsApi } from "../api/listingsApi";

function CreateListingPage() {
    const navigate = useNavigate();

    return (
        <ProtectedRoute>
            <DashboardLayout title="Create a new listing">
                <Card className="p-5">
                    <ListingWizard
                        submitLabel="Publish listing"
                        onSubmit={async (values) => {
                            try {
                                const created = await listingsApi.createListing(values);

                                toast.success("Listing published");

                                navigate(`/listings/${created._id || created.id}`);
                            } catch (e) {
                                toast.error(e?.message || "Failed to create listing");
                            }
                        }}
                    />
                </Card>
            </DashboardLayout>
        </ProtectedRoute>
    );
}

export default CreateListingPage;