import dbConnect from "@/app/lib/db";
import Cart from "../../models/Cart";

export async function GET(request) {
    await dbConnect();
    try {
        const carts = await Cart.find().populate('user', 'username email');
        return new Response(JSON.stringify(carts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};