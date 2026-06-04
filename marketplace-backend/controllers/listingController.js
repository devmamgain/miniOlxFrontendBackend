const Listing = require("../models/Listing");

exports.getListings = async (req, res) => {
    try {
        const {
            search,
            category,
            condition,
            minPrice,
            maxPrice,
            location,
            availability,
            page = 1,
            limit = 10,
        } = req.query;

        const filter = {};
        if (availability === "available") {
            filter.status = "available";
        }

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            filter.category = category;
        }

        if (condition) {
            filter.condition = condition;
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i",
            };
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice)
                filter.price.$gte = Number(minPrice);

            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }

        const total = await Listing.countDocuments(
            filter
        );

        const listings = await Listing.find(filter)
            .populate(
                "seller",
                "name email phone"
            )
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json({
            data: listings,
            page: Number(page),
            totalPages: Math.ceil(
                total / limit
            ),
            total,
            hasMore:
                page * limit < total,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getListingById = async (
    req,
    res
) => {
    try {
        const listing =
            await Listing.findById(
                req.params.id
            ).populate(
                "seller",
                "name email phone"
            );

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
            });
        }

        res.json(listing);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.createListing = async (
    req,
    res
) => {
    try {
        const listing =
            await Listing.create({
                ...req.body,
                seller: req.user.id,
            });

        const populated =
            await listing.populate(
                "seller",
                "name email phone"
            );

        res.status(201).json(
            populated
        );
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateListing = async (
    req,
    res
) => {
    try {
        const listing =
            await Listing.findById(
                req.params.id
            );

        if (!listing) {
            return res.status(404).json({
                message: "Not found",
            });
        }

        if (
            listing.seller.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        Object.assign(
            listing,
            req.body
        );
        if (listing.status === "sold") {
            listing.status = "available";
        }
        await listing.save();

        res.json(listing);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.markAsSold = async (
    req,
    res
) => {
    try {
        const listing =
            await Listing.findById(
                req.params.id
            );

        if (!listing) {
            return res.status(404).json({
                message: "Not found",
            });
        }

        listing.status = "sold";

        await listing.save();

        res.json(listing);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteListing = async (
    req,
    res
) => {
    try {
        const listing =
            await Listing.findById(
                req.params.id
            );

        if (!listing) {
            return res.status(404).json({
                message: "Not found",
            });
        }

        if (
            listing.seller.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        await listing.deleteOne();

        res.json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMyListings = async (
    req,
    res
) => {
    try {
        const listings =
            await Listing.find({
                seller: req.user.id,
            })
                .populate(
                    "seller",
                    "name email phone"
                )
                .sort({
                    createdAt: -1,
                });

        res.json(listings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};