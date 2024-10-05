// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={8} className="mx-auto text-center">
                    <h1>Welcome to our E-commerce Store</h1>
                    <p className="lead">Find the best products at the best prices!</p>
                    <Button as={Link} to="/products" variant="primary" size="lg">Shop Now</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;