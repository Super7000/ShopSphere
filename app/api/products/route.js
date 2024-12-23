import dbConnect from "../../lib/db";
import Product from "../models/Product";

export async function GET(request) {
    // Logic for handling GET requests
    await dbConnect();

    try {
        const products = await Product.find({});

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}