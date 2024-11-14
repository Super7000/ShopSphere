import Product from "../../../models/Product";
import dbConnect from "../../../../lib/db";
import { uploadImg } from "../../../../lib/uploadImg"
import { deleteImg } from "../../../../lib/deleteImg"

export async function PUT(request, { params }) {
    const req = await request.formData();
    const { id } = await params;

    await dbConnect();

    try {
        const file = req.get("image");
        let imageUrl;
        if (typeof file != "string") {
            imageUrl = await uploadImg(file, id)
        } else {
            imageUrl = req.get("image");
        }

        const newProductDetails = {
            name: req.get("name"),
            description: req.get("description"),
            price: req.get("price"),
            category: req.get("category"),
            imageUrl,
            stock: req.get("stock"),
            createdAt: req.get("createdAt")
        }


        const product = await Product.findByIdAndUpdate(id, newProductDetails, { new: true });
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
    const { id } = await params;
    await dbConnect();
    const session = await Product.startSession();
    session.startTransaction();
    try {
        const product = await Product.findByIdAndDelete(id, { session });
        if (!product) {
            await session.abortTransaction();
            session.endSession();
            return new Response(JSON.stringify({ message: 'Product not found' }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        if (product.imageUrl) {
            try {
                await deleteImg(product.imageUrl);
            } catch (err) {
                await session.abortTransaction();
                session.endSession();
                return new Response(JSON.stringify({ message: 'Error deleting image, transaction aborted' }), {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        }

        await session.commitTransaction();
        session.endSession();
        return new Response(JSON.stringify({ message: 'Product deleted' }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}