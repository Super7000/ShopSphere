import dbConnect from "../../../lib/db";
import Cart from "../../models/Cart";
import { cookies } from "next/headers";

export async function DELETE(request, { params }) {
    const cookieList = await cookies()
    const user = {
        id: cookieList.get('userId').value,
        isAdmin: cookieList.get('isAdmin').value
    }
    const { id } = await params;
    await dbConnect();
    try {
        const cart = await Cart.findOne({ user: user.id });

        if (!cart) return new Response(JSON.stringify({ message: 'Cart not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const productIndex = cart.products.findIndex(p => p.product._id == id);

        if (productIndex == -1) return new Response(JSON.stringify({ message: 'Product not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });

        cart.products.splice(productIndex, 1);
        await cart.save();
        return new Response(JSON.stringify(cart), {
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

export async function PUT(request, { params }) {
    const req = await request.json();
    const cookieList = await cookies()
    const user = {
        id: cookieList.get('userId'),
        isAdmin: cookieList.get('isAdmin')
    }
    const { id } = await params;
    await dbConnect();
    try {
        const cart = await Cart.findOne({ user: user.id });

        if (!cart) return new Response(JSON.stringify({ message: 'Cart not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const product = cart.products.find(p => p._id == id);

        if (!product) return new Response(JSON.stringify({ message: 'Product not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });

        product.quantity = req.quantity;
        await cart.save();
        return new Response(JSON.stringify(cart), {
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