import User from "../../../models/User";
import dbConnect from "../../../../lib/db";

export async function PUT(request, { params }) {
    const { id } = await params;
    const data = await request.json();
    await dbConnect();
    try {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        return new Response(JSON.stringify(user), {
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

export async function DELETE(request, { params }) {
    const { id } = await params;
    await dbConnect()
    try {
        await User.findByIdAndDelete(id);
        return new Response(JSON.stringify({ message: 'User deleted' }), {
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