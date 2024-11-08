// models/Order.js
import mongoose, { models, model } from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    shippingAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Order = models.Order || model('Order', OrderSchema);

export default Order;
