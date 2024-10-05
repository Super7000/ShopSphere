import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            // Redirect to login page or show success message
        } catch (error) {
            console.error('Registration error', error.response.data);
        }
    };

    return (
        <Form className='d-flex gap-3 flex-column' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>
            <div className='d-grid'>
                <Button style={{ justifySelf: 'start' }} variant="primary" type="submit">Register</Button>
            </div>
        </Form>
    );
}

export default Register;
