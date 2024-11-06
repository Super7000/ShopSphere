import Product from "@/app/api/models/Product";
import dbConnect from "@/app/lib/db";

export async function PUT(request, { params }) {
    const req = await request.json();
    const { id } = await params;

    await dbConnect();
    try {
        const product = await Product.findByIdAndUpdate(id, req, { new: true });
        if (!product) return new Response(JSON.stringify({ message: 'Product not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify(product), {
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
        const product = await Product.findByIdAndDelete(id);
        if (!product) return new Response(JSON.stringify({ message: 'Product not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify({ message: 'Product deleted' }), {
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