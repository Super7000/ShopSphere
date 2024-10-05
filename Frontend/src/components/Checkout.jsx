import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Checkout() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/orders/', formData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (response.status === 201) {
                alert('Order placed successfully');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Form className='d-flex flex-column gap-2' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" name="address" onChange={handleChange} required />
            </Form.Group>
            <div className='d-grid'>
                <Button style={{ justifySelf: 'start' }} variant="primary" type="submit">Place Order</Button>
            </div>
        </Form>
    );
}

export default Checkout;
