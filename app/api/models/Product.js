// models/Product.js
import mongoose, { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, immutable: true },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;