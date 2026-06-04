import axiosClient from "../services/axiosClient";

export const uploadApi = {
    uploadImages: (files, onProgress) => {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("images", file);
        });

        return axiosClient
            .post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (event) => {
                    if (onProgress && event.total) {
                        const percentage = Math.round(
                            (event.loaded * 100) / event.total
                        );

                        onProgress(percentage);
                    }
                },
            })
            .then((res) => res.data);
    },
};