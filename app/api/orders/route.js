import dbConnect from "../../lib/db";
import Cart from "../models/Cart";
import { cookies } from "next/headers";
import Order from "../models/Order";

// Create a new order
export async function POST(request) {
    const req = await request.json();
    const cookieList = await cookies()
    const user = {
        id: cookieList.get('userId').value,
        isAdmin: cookieList.get('isAdmin').value
    }
    await dbConnect();

    try {
        const cart = await Cart.findOne({ user: user.id }).populate('products.product');
        if (!cart) {
            return new Response(JSON.stringify({ message: 'Cart not found' }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        // Calculate total
        let total = 0;
        cart.products.forEach(item => {
            total += item.product.price * item.quantity;
        });

        const order = await new Order({
            user: user.id,
            products: cart.products,
            total: total,
            shippingAddress: req.address
        });
        console.log(user.id)

        const newOrder = await order.save();

        // Clear the cart after order is placed
        await Cart.findByIdAndDelete(cart._id);

        return new Response(JSON.stringify(newOrder), {
            status: 201,
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