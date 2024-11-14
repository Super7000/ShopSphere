'use client'
import axios from 'axios';
import { get } from 'http';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function AdminNavigationBar({ onError = () => { } }) {
    const [profileInfo, setProfileInfo] = useState(null)

    const navigate = useRouter();

    const getProfileInfo = useCallback(async () => {
        try {
            const res = await axios.get('/api/users/profile', {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            setProfileInfo(res.data);
        } catch (error) {
            console.log(error);
            setProfileInfo(null);
            onError(error);
        }
    }, [onError, setProfileInfo]);

    useEffect(() => {
        getProfileInfo();
    }, [getProfileInfo]);

    if (!profileInfo) return null
    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/">E-commarce Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="ml-auto align-items-center">
                        <Nav.Link href="/admin/">Dashboard</Nav.Link>
                        <Nav.Link href="/admin/products">Products</Nav.Link>
                        <Nav.Link href="/admin/carts">Carts Details</Nav.Link>
                        <Nav.Link href="/admin/users">Users</Nav.Link>
                        <Nav.Link href="/admin/blogs">Blogs</Nav.Link>
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

export default AdminNavigationBar;