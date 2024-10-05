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

module.exports = router;