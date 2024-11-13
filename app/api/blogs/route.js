import dbConnect from "../../lib/db";
import Blog from "../models/Blog";

export async function GET(params) {
    try {
        await dbConnect();
        let blogs = await Blog.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify(blogs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}