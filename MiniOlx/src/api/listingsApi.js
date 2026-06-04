import axiosClient from "../services/axiosClient";

export const listingsApi = {
    getListings: (params = {}, signal) =>
        axiosClient
            .get("/listings", { params, signal })
            .then((r) => r.data),

    getListingById: (id) =>
        axiosClient
            .get(`/listings/${id}`)
            .then((r) => r.data),

    createListing: (payload) =>
        axiosClient
            .post("/listings", payload)
            .then((r) => r.data),

    updateListing: (id, payload) =>
        axiosClient
            .put(`/listings/${id}`, payload)
            .then((r) => r.data),

    markAsSold: (id) =>
        axiosClient
            .patch(`/listings/${id}/sold`)
            .then((r) => r.data),

    deleteListing: (id) =>
        axiosClient
            .delete(`/listings/${id}`)
            .then((r) => r.data),

    getMyListings: () =>
        axiosClient
            .get("/my-listings")
            .then((r) => r.data),
};