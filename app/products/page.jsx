'use client'
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';
import Loading from '../loading';

function ProductList({ onProductClick = () => { }, fetcherFuncRef = { current: null } }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await axios.get('/api/products');
        setProducts(res.data);
    };
    fetcherFuncRef.current = fetchProducts;

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <Row>
            {products.length > 0 && products.map(product => (
                <Col md={4} key={product._id}>
                    <Card className="mb-4" onClick={() => onProductClick(product)}>
                        <Card.Img variant="top" src={product.imageUrl} style={{ height: '15rem', objectFit: 'cover', objectPosition: 'center' }} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <Link href={`/products/${product._id}`} passHref>
                                <Button variant="primary">View Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            {products.length === 0 && <Loading />}
        </Row>
    );
}

export default ProductList;