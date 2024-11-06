'use client'
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function AdminNavigationBar() {
    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/">E-commarce Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="ml-auto">
                        <Nav.Link href="/admin/">Dashboard</Nav.Link>
                        <Nav.Link href="/admin/products">Products</Nav.Link>
                        <Nav.Link href="/admin/carts">Carts Details</Nav.Link>
                        <Nav.Link href="/admin/users">Users</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavigationBar;