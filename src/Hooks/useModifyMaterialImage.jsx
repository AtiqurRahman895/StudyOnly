import { useMemo } from "react";

const useModifyCloudinaryUrl = (url) => {
    const imageUrl = useMemo(() => {
        if (!url || !url.includes("cloudinary.com")) return url; // Return unchanged if not a Cloudinary URL
        const parts = url.split("/upload/");
        return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
    }, [url]);

    return imageUrl;
};

export default useModifyCloudinaryUrl;
