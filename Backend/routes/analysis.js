// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get most sold products
router.get('/most-sold-products', [auth, admin], async (req, res) => {
    try {
        const products = await Order.aggregate([
            { $unwind: '$products' },
            { $group: { _id: '$products.product', totalSold: { $sum: '$products.quantity' } } },
            { $sort: { totalSold: -1 } },
            { $limit: 10 },
            { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
            { $unwind: '$product' },
            {
                $project: {
                    _id: 1,
                    product: {
                        _id: '$product._id',
                        name: '$product.name',
                        description: '$product.description',
                        price: '$product.price',
                        imageUrl: '$product.imageUrl',
                        category: '$product.category',
                        stock: '$product.stock'
                    },
                    totalSold: 1
                }
            }
        ]);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get users that placed most orders
router.get('/top-users', [auth, admin], async (req, res) => {
    try {
        const users = await Order.aggregate([
            { $group: { _id: '$user', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 10 },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 1,
                    user: {
                        _id: '$user._id',
                        name: '$user.name',
                        email: '$user.email'
                    },
                    total: 1
                }
            }
        ]);
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get top products based on price
router.get('/top-products-by-price', [auth, admin], async (req, res) => {
    try {
        const products = await Product.find().sort({ price: -1 }).limit(10);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get least products based on price
router.get('/least-products-by-price', [auth, admin], async (req, res) => {
    try {
        const products = await Product.find().sort({ price: 1 }).limit(10);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;