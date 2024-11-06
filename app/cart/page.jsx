'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Container } from 'react-bootstrap';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        const res = await axios.get('/api/cart', {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        if (res.status === 200) {
            setIsLoggedIn(true)
            if (res.data && res.data.products)
                setCartItems(res.data.products.map(e => { return { ...e.product, quantity: e.quantity } }) || []);
        } else {
            setIsLoggedIn(false)
        }
    }

    async function removeProduct(productId) {
        await axios.delete(`/api/cart/${productId}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        fetchProducts();
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            {
                isLoggedIn && <>
                    <h2>Your Cart</h2>
                    <ListGroup className='pt-2'>
                        {cartItems.map((item, index) => (
                            <ListGroup.Item key={item._id || index} className='d-flex justify-between fs-5 align-items-center'>
                                <Link href={'/product/' + item._id} className='text-decoration-none'>{item.name} - ${item.price} x {item.quantity}</Link>
                                <Button variant='danger' className='ms-auto' onClick={() => removeProduct(item._id)}>Remove</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h3 className='mt-3'>Total: ${total.toFixed(2)}</h3>
                    <Link href="/checkout" className='text-decoration-none' passHref>
                        <Button variant="primary" className='mt-2'>Proceed to Checkout</Button>
                    </Link>
                </>
            }
            {
                !isLoggedIn &&
                <div className='d-grid justify-content-center'>
                    <h3>Please log in to view your cart.</h3>
                    <Link href="/login" className='text-decoration-none' passHref>
                        <Button className='justify-self-center' variant='primary'>Log In</Button>
                    </Link>
                </div>
            }
        </div>
    );
}

export default Cart;
