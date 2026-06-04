const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        negotiable: {
            type: Boolean,
            default: false,
        },

        category: {
            type: String,
            required: true,
        },

        condition: {
            type: String,
            enum: [
                "new",
                "like_new",
                "good",
                "fair",
                "poor",
            ],
            default: "good",
        },

        location: {
            type: String,
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        status: {
            type: String,
            enum: ["available", "sold"],
            default: "available",
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Listing",
    listingSchema
);