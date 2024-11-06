import dbConnect from "@/app/lib/db";
import Order from "../../models/Order";

export async function GET(request) {
    await dbConnect();
    try {
        const orders = await Order.find().populate('user', 'username email');
        return new Response(JSON.stringify(orders), {
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
}