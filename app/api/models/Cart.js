// models/Cart.js
import { Schema, models, model } from 'mongoose';

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        },
    ]
});
const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;