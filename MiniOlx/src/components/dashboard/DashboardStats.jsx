import {
    Package,
    CheckCircle2,
    ShoppingBag,
} from "lucide-react";

import { Card } from "../ui/Card";

export function DashboardStats({
    listings,
}) {
    const total =
        listings?.length;

    const active =
        listings?.filter(
            (listing) =>
                listing.status ===
                "available"
        ).length;

    const sold =
        listings?.filter(
            (listing) =>
                listing.status ===
                "sold"
        ).length;

    const items = [
        {
            label:
                "Total listings",

            value: total,

            icon: Package,

            color:
                "text-primary",
        },

        {
            label: "Active",

            value: active,

            icon: ShoppingBag,

            color:
                "text-success",
        },

        {
            label: "Sold",

            value: sold,

            icon: CheckCircle2,

            color:
                "text-muted-foreground",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {items.map((item) => (
                <Card
                    key={item.label}
                    className="flex items-center gap-4 p-4"
                >
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${item.color}`}
                    >
                        <item.icon className="h-5 w-5" />
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground">
                            {item.label}
                        </div>

                        <div className="text-xl font-semibold">
                            {item.value}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}