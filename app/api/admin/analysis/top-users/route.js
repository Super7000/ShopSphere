import Order from "@/app/api/models/Order";
import dbConnect from "@/app/lib/db";

export async function GET(request) {
    await dbConnect()
    
    try {
        const users = await Order.aggregate([
            { $group: { _id: '$user', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 10 },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 1,
                    user: {
                        _id: '$user._id',
                        name: '$user.name',
                        email: '$user.email'
                    },
                    total: 1
                }
            }
        ]);
        return new Response(JSON.stringify(users), {
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