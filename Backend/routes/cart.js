// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get user's cart
router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add product to cart
router.post('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            console.log(req.body.productId)
            cart = new Cart({
                user: req.user.id,
                products: [{ product: req.body.productId, quantity: req.body.quantity }]
            });

            await cart.save();
            return res.status(201).json(cart);
        }

        const productExists = cart.products.find(p => p.product == req.body.productId);

        if (productExists) {
            productExists.quantity += req.body.quantity;
        } else {
            cart.products.push({ product: req.body.productId, quantity: req.body.quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove product from cart
router.delete('/:id', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.products.findIndex(p => p.product._id == req.params.id);

        if (productIndex == -1) return res.status(404).json({ message: 'Product not found' });

        cart.products.splice(productIndex, 1);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update product quantity in cart
router.put('/:id', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const product = cart.products.find(p => p._id == req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.quantity = req.body.quantity;
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//admin only
router.get('/all', [auth, admin], async (req, res) => {
    try {
        const carts = await Cart.find().populate('user', 'username email');
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//admin only
router.put('/:id', [auth, admin], async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//admin only
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;