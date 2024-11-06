import Product from "../../../models/Product";
import dbConnect from "../../../../lib/db";

export async function GET(request) {
    await dbConnect()
    
    try {
        const products = await Product.find().sort({ price: 1 }).limit(10);
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error(err.message);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}