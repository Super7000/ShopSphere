// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Cart = require('../models/Cart');

// Create a new order
router.post('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        if (!cart) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total
        let total = 0;
        cart.products.forEach(item => {
            total += item.product.price * item.quantity;
        });

        // Use the calculated total
        req.body.total = total;

        const order = new Order({
            user: req.user.id,
            products: cart.products,
            total: req.body.total,
            shippingAddress: req.body.address
        });

        const newOrder = await order.save();

        // Clear the cart after order is placed
        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all orders (admin only)
router.get('/', [auth, admin], async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'username email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's orders
router.get('/myorders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update order status (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
