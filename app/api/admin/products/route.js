import Product from "../../models/Product";
import dbConnect from "@/app/lib/db";

export async function POST(request) {
    const req = await request.json();
    await dbConnect();
    const product = new Product({
        ...req,
    });
    try {
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