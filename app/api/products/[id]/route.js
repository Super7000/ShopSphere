import dbConnect from "../../../lib/db";
import Product from "../../models/Product";

export async function GET(request, { params }) {
    const { id } = await params;

    await dbConnect();

    try {
        const product = await Product.findById(id);
        if (!product)
            return new Response(JSON.stringify({ message: 'Product not found' }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify(err.message), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}