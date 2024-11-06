'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavigationBar() {
    const [profileInfo, setProfileInfo] = useState(null)

    const navigate = useRouter();

    async function getProfileInfo() {
        try {
            const res = await axios.get('/api/users/profile', {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            setProfileInfo(res.data);
        } catch (error) {
            console.log(error);
            setProfileInfo(null);
        }
    }

    useEffect(() => {
        getProfileInfo();
    }, []);

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand>E-commerce Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="ml-auto align-items-center">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/products'>Products</Nav.Link>
                        <Nav.Link href='/cart'>Cart</Nav.Link>
                        {!profileInfo && <>
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link href='/register'>Register</Nav.Link>
                        </>}
                        {profileInfo && <>
                            <Button variant='danger p-1 px-2 ms-2' onClick={() => {
                                localStorage.removeItem('token');
                                setProfileInfo(null);
                                navigate.push('/');
                            }}>Logout</Button>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;