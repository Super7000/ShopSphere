import Order from "../../../models/Order";
import dbConnect from "../../../../lib/db";

export async function PUT(request, { params }) {
    const req = await request.json();
    const { id } = params;
    await dbConnect();
    try {
        const order = await Order.findByIdAndUpdate(id, { status: req.status }, { new: true });
        if (!order) return new Response(JSON.stringify({ message: 'Order not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify(order), {
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