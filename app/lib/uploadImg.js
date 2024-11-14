import path from "path";
import { writeFile } from "fs/promises";

export async function uploadImg(file, filename) {
    if (!file) {
        throw new Error("No file attached");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    try {
        const extension = path.extname(file.name);
        await writeFile(
            path.join(process.cwd(), "public/uploads/products/" + filename + extension),
            buffer
        );
        return "/uploads/products/" + filename + extension;
    } catch (error) {
        console.log("Error occured ", error);
        throw error;
    }
}