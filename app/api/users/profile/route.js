import dbConnect from "@/app/lib/db";
import User from "../../models/User";
import { cookies } from "next/headers";

export async function GET(request) {
    // Logic for handling GET requests
    await dbConnect();
    const cookieList = await cookies()
    const userData = {
        id: cookieList.get('userId').value,
        isAdmin: cookieList.get('isAdmin').value
    }

    try {
        const user = await User.findById(userData.id).select('-password');
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}