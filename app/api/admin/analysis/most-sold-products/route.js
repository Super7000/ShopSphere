import Order from "../../../models/Order";
import Product from "../../../models/Product";
import dbConnect from "../../../../lib/db";

export async function GET(request) {
    await dbConnect()

    try {
        const products = await Order.aggregate([
            { $unwind: '$products' },
            { $group: { _id: '$products.product', totalSold: { $sum: '$products.quantity' } } },
            { $sort: { totalSold: -1 } },
            { $limit: 10 },
            { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
            { $unwind: '$product' },
            {
                $project: {
                    _id: 1,
                    product: {
                        _id: '$product._id',
                        name: '$product.name',
                        description: '$product.description',
                        price: '$product.price',
                        imageUrl: '$product.imageUrl',
                        category: '$product.category',
                        stock: '$product.stock'
                    },
                    totalSold: 1
                }
            }
        ]);
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