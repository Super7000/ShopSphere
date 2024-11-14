import Product from "../../models/Product";
import dbConnect from "../../../lib/db";
import { uploadImg } from "../../../lib/uploadImg";
import mongoose from "mongoose";

export async function POST(request) {
    const req = await request.formData();
    await dbConnect();

    try {
        const id = new mongoose.Types.ObjectId();
        const file = req.get("image");
        let imageUrl;
        if (typeof file != "string") {
            imageUrl = await uploadImg(file, id)
        } else {
            return new Response(JSON.stringify({ message: 'Image is required' }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const product = new Product({
            _id: id,
            name: req.get("name"),
            description: req.get("description"),
            price: req.get("price"),
            category: req.get("category"),
            imageUrl,
            stock: req.get("stock"),
            createdAt: req.get("createdAt")
        });

        const newProduct = await product.save();
        return new Response(JSON.stringify(newProduct), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}