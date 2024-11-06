import Cart from "@/app/api/models/Cart";
import dbConnect from "@/app/lib/db";

export async function PUT(request, { params }) {
    const req = await request.json();
    const { id } = await params;
    await dbConnect();
    try {
        const cart = await Cart.findByIdAndUpdate(id, req, { new: true });
        if (!cart) return new Response(JSON.stringify({ message: 'Cart not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify(cart), {
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

export async function DELETE(request, { params }) {
    const { id } = await params;
    await dbConnect();
    try {
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) return new Response(JSON.stringify({ message: 'Cart not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify({ message: 'Cart deleted' }), {
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