import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminNavigationBar() {
    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">E-commarce Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/admin/">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/admin/carts">Carts Details</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavigationBar;