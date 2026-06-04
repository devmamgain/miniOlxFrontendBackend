const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getListings,
    getListingById,
    createListing,
    updateListing,
    markAsSold,
    deleteListing,
    getMyListings,
} = require("../controllers/listingController");

router.get(
    "/listings",
    getListings
);

router.get(
    "/listings/:id",
    getListingById
);

router.post(
    "/listings",
    authMiddleware,
    createListing
);

router.put(
    "/listings/:id",
    authMiddleware,
    updateListing
);

router.patch(
    "/listings/:id/sold",
    authMiddleware,
    markAsSold
);

router.delete(
    "/listings/:id",
    authMiddleware,
    deleteListing
);

router.get(
    "/my-listings",
    authMiddleware,
    getMyListings
);

module.exports = router;