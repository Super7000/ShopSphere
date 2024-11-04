import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', formData);
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            navigate("/")
        } catch (error) {
            console.error('Login error', error.response.data);
        }
    };

    return (
        <Form className='d-flex gap-3 flex-column' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>
            <div className='d-grid'>
                <Button style={{ justifySelf: 'start' }} variant="primary" type="submit">Login</Button>
            </div>
        </Form>
    );
}

export default Login;
