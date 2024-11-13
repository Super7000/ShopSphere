import dbConnect from "../../../lib/db";
import Blog from "../../models/Blog";

export async function GET(request, { params }) {
    const { id } = await params;

    await dbConnect();

    try {
        const blog = await Blog.findById(id);
        if (!blog)
            return new Response(JSON.stringify({ message: 'Blog not found' }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });

        return new Response(JSON.stringify(blog), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify(err.message), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}