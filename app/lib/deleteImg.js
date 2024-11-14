import path from "path";
import { unlink } from "fs/promises";

export async function deleteImg(filename) {
    if (!filename) {
        throw new Error("No filename provided");
    }

    try {
        const filePath = path.join(process.cwd(), "public/", filename);
        await unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
    } catch (error) {
        console.log("Error occurred while deleting the file", error);
        throw error;
    }
}