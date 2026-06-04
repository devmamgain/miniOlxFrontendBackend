import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email required")
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Min 6 characters"),
});

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name too short")
        .max(60),

    email: z
        .string()
        .trim()
        .min(1, "Email required")
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Min 6 characters")
        .max(72),
});

export const conditionEnum = z.enum([
    "new",
    "like_new",
    "good",
    "fair",
    "poor",
]);

export const stepBasicSchema = z.object({
    title: z
        .string()
        .trim()
        .min(
            5,
            "Title must be at least 5 characters"
        )
        .max(100),

    category: z
        .string()
        .trim()
        .min(
            1,
            "Select a category"
        ),

    description: z
        .string()
        .trim()
        .min(
            20,
            "Min 20 characters"
        )
        .max(2000),
});

export const stepPricingSchema = z.object({
    price: z.coerce
        .number()
        .positive(
            "Price must be positive"
        )
        .max(10000000),

    negotiable: z
        .boolean()
        .default(false),
});

export const stepConditionSchema = z.object({
    condition: conditionEnum,

    location: z
        .string()
        .trim()
        .min(
            2,
            "Location required"
        )
        .max(100),
});

export const stepImagesSchema =
    z.object({
        images: z
            .array(z.string().url())
            .min(
                1,
                "Upload at least 1 image"
            )
            .max(
                8,
                "Up to 8 images"
            ),
    });

export const fullListingSchema =
    stepBasicSchema
        .merge(stepPricingSchema)
        .merge(stepConditionSchema)
        .merge(stepImagesSchema);

export const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const MAX_IMAGE_SIZE =
    5 * 1024 * 1024;

export const MAX_IMAGES = 8;