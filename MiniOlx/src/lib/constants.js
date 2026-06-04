export const CATEGORIES = [
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "furniture", label: "Furniture" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Hobbies" },
    { value: "books", label: "Books" },
    { value: "toys", label: "Toys & Games" },
    { value: "other", label: "Other" },
];

export const CONDITIONS = [
    { value: "new", label: "New" },
    { value: "like_new", label: "Like New" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
];

export function conditionLabel(v) {
    return (
        CONDITIONS.find(
            (c) => c.value === v
        )?.label || v
    );
}

export function categoryLabel(v) {
    return (
        CATEGORIES.find(
            (c) => c.value === v
        )?.label || v
    );
}

export function formatPrice(n) {
    return new Intl.NumberFormat(
        undefined,
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }
    ).format(n);
}

export function formatDate(iso) {
    try {
        return new Date(
            iso
        ).toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    } catch {
        return iso;
    }
}