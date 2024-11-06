import dbConnect from "@/app/lib/db";
import User from "../../models/User";

export async function GET(request) {
    await dbConnect();
    try {
        const users = await User.find().select('-password');
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