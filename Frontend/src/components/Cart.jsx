import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5000/api/cart', {
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
        await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
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
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id} className='d-flex justify-between fs-5 align-items-center'>
                                <Link to={'/product/' + item._id} className='text-decoration-none'>{item.name} - ${item.price} x {item.quantity}</Link>
                                <Button variant='danger' className='ms-auto' onClick={() => removeProduct(item._id)}>Remove</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h3 className='mt-3'>Total: ${total.toFixed(2)}</h3>
                    <Button as={Link} to="/checkout" variant="primary" className='mt-2'>Proceed to Checkout</Button>
                </>
            }
            {
                !isLoggedIn &&
                <div className='d-grid justify-content-center'>
                    <h3>Please log in to view your cart.</h3>
                    <Button className='justify-self-center' as={Link} to="/login" variant='primary'>Log In</Button>
                </div>
            }
        </div>
    );
}

export default Cart;
