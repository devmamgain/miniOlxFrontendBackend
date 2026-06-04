import { X } from "lucide-react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Badge } from "../ui/Badge";

import {
    CATEGORIES,
    CONDITIONS,
    conditionLabel,
    categoryLabel,
} from "../../lib/constants";

export function ListingFilters({
    values,
    onChange,
    onClear,
}) {
    const update = (
        key,
        value
    ) => {
        onChange({
            ...values,
            [key]: value,
        });
    };

    const hasActive =
        Object.values(values).some(
            (value) =>
                value !== undefined &&
                value !== "" &&
                value !== null
        );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                    Filters
                </h3>

                {hasActive && (
                    <button
                        onClick={onClear}
                        className="text-xs text-primary hover:underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {hasActive && (
                <div className="flex flex-wrap gap-1.5">
                    {values.category && (
                        <Badge
                            variant="default"
                            className="gap-1"
                        >
                            {categoryLabel(
                                values.category
                            )}

                            <button
                                onClick={() =>
                                    update(
                                        "category",
                                        undefined
                                    )
                                }
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {values.condition && (
                        <Badge
                            variant="default"
                            className="gap-1"
                        >
                            {conditionLabel(
                                values.condition
                            )}

                            <button
                                onClick={() =>
                                    update(
                                        "condition",
                                        undefined
                                    )
                                }
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {values.location && (
                        <Badge
                            variant="default"
                            className="gap-1"
                        >
                            {values.location}

                            <button
                                onClick={() =>
                                    update(
                                        "location",
                                        undefined
                                    )
                                }
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {(values.minPrice ||
                        values.maxPrice) && (
                            <Badge
                                variant="default"
                                className="gap-1"
                            >
                                $
                                {values.minPrice ??
                                    0}
                                {" - "}
                                $
                                {values.maxPrice ??
                                    "∞"}

                                <button
                                    onClick={() =>
                                        onChange({
                                            ...values,
                                            minPrice:
                                                undefined,
                                            maxPrice:
                                                undefined,
                                        })
                                    }
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                </div>
            )}

            <Select
                label="Category"
                placeholder="All categories"
                value={
                    values.category || ""
                }
                onChange={(e) =>
                    update(
                        "category",
                        e.target.value ||
                        undefined
                    )
                }
                options={CATEGORIES}
            />

            <Select
                label="Condition"
                placeholder="Any condition"
                value={
                    values.condition || ""
                }
                onChange={(e) =>
                    update(
                        "condition",
                        e.target.value ||
                        undefined
                    )
                }
                options={CONDITIONS}
            />

            <div className="grid grid-cols-2 gap-2">
                <Input
                    label="Min price"
                    type="number"
                    min={0}
                    value={
                        values.minPrice || ""
                    }
                    onChange={(e) =>
                        update(
                            "minPrice",
                            e.target.value
                                ? Number(
                                    e.target.value
                                )
                                : undefined
                        )
                    }
                />

                <Input
                    label="Max price"
                    type="number"
                    min={0}
                    value={
                        values.maxPrice || ""
                    }
                    onChange={(e) =>
                        update(
                            "maxPrice",
                            e.target.value
                                ? Number(
                                    e.target.value
                                )
                                : undefined
                        )
                    }
                />
            </div>

            {/* <Input
                label="Location"
                placeholder="e.g. New York"
                value={
                    values.location || ""
                }
                onChange={(e) =>
                    update(
                        "location",
                        e.target.value ||
                        undefined
                    )
                }
            /> */}

            <Select
                label="Availability"
                value={
                    values.availability ||
                    "available"
                }
                onChange={(e) =>
                    update(
                        "availability",
                        e.target.value
                    )
                }
                options={[
                    {
                        value:
                            "available",
                        label:
                            "Available only",
                    },
                    {
                        value: "all",
                        label:
                            "Include sold",
                    },
                ]}
            />

            {hasActive && (
                <Button
                    variant="outline"
                    fullWidth
                    onClick={onClear}
                >
                    Clear filters
                </Button>
            )}
        </div>
    );
}