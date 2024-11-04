import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
    const [profileInfo, setProfileInfo] = useState(null)

    const navigate = useNavigate();

    async function getProfileInfo() {
        try {
            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            setProfileInfo(res.data);
        } catch (error) {
            console.error(error);
            setProfileInfo(null);
        }
    }

    useEffect(() => {
        getProfileInfo();
    }, []);

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">E-commerce Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="ml-auto align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                        {!profileInfo && <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>}
                        {profileInfo && <>
                            <Button variant='danger p-1 px-2 ms-2' onClick={() => {
                                localStorage.removeItem('token');
                                setProfileInfo(null);
                                navigate('/');
                            }}>Logout</Button>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;