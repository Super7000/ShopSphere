import dbConnect from "../../lib/db";
import Cart from "../models/Cart";
import { cookies } from "next/headers";
import Product from "../models/Product";

export async function GET(request) {
    const cookieList = await cookies()
    const user = {
        id: cookieList.get('userId').value,
        isAdmin: cookieList.get('isAdmin').value
    }
    await dbConnect();

    try {
        const cart = await Cart.findOne({ user: user.id }).populate('products.product');
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

export async function POST(request) {
    const req = await request.json();
    const cookieList = await cookies()
    const user = {
        id: cookieList.get('userId').value,
        isAdmin: cookieList.get('isAdmin').value
    }
    await dbConnect();
    try {
        let cart = await Cart.findOne({ user: user.id });

        if (!cart) {
            cart = new Cart({
                user: user.id,
                products: [{ product: req.productId, quantity: req.quantity }]
            });

            await cart.save();
            return new Response(JSON.stringify(cart), {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const productExists = cart.products.find(p => p.product == req.productId);

        if (productExists) {
            productExists.quantity += req.quantity;
        } else {
            cart.products.push({ product: req.productId, quantity: req.quantity });
        }

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