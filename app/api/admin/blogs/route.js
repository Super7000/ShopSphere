import Blog from "../../models/Blog";
import dbConnect from "../../../lib/db";

export async function POST(request) {
    const req = await request.json();
    await dbConnect();
    const blog = new Blog({
        ...req,
    });
    try {
        const newBlog = await blog.save();
        return new Response(JSON.stringify(newBlog), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}