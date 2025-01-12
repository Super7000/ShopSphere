import Blog from "../../../models/Blog";
import dbConnect from "../../../../lib/db";

export async function PUT(request, { params }) {
    const req = await request.json();
    const { id } = await params;

    await dbConnect();
    try {
        const blog = await Blog.findByIdAndUpdate(id, req, { new: true });
        if (!blog) return new Response(JSON.stringify({ message: 'Blog not found' }), {
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
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await dbConnect();
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return new Response(JSON.stringify({ message: 'Blog not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify({ message: 'Blog deleted' }), {
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