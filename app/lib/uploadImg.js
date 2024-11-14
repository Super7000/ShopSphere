import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImg(file, filename) {
    if (!file) {
        throw new Error("No file attached");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { public_id: filename, folder: "ShopSphere/Products", overwrite: true },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(buffer);
        });

        return result.secure_url;
    } catch (error) {
        console.log("Error occurred ", error);
        throw error;
    }
}