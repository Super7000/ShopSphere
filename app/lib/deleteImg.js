import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImg(imageUrl) {
    if (!imageUrl) {
        throw new Error("No public ID provided");
    }

    try {
        const result = await cloudinary.uploader.destroy(extractPublicIdFromUrl(imageUrl));
        if (result.result !== "ok") {
            throw new Error(`Failed to delete image: ${result.result}`);
        }
        console.log(`Deleted image: ${imageUrl}`);
    } catch (error) {
        console.log("Error occurred while deleting the image", error);
        throw error;
    }
}

function extractPublicIdFromUrl(url) {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return ('ShopSphere/Products/' + publicId);
}